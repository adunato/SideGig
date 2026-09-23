#!/usr/bin/env python3
"""Collect SideGig-review learning records from registered product repositories."""

from __future__ import annotations

import argparse
import base64
import datetime as dt
import hashlib
import json
import os
import pathlib
import re
import sys
import urllib.error
import urllib.parse
import urllib.request


REQUIRED_METADATA = (
    "Learning ID",
    "Origin repository",
    "Source",
    "Lifecycle stage / skill",
    "Date",
    "Category",
    "SideGig review",
    "Disposition",
)
REQUIRED_SECTIONS = (
    "Change context",
    "Observation",
    "Evidence",
    "Impact",
    "Local action",
    "Cross-project relevance",
    "Stable local references",
)


class GithubClient:
    def __init__(self, token: str | None, api_url: str) -> None:
        self.token = token
        self.api_url = api_url.rstrip("/")

    def get(self, path: str, *, accept: str = "application/vnd.github+json"):
        request = urllib.request.Request(
            f"{self.api_url}{path}",
            headers={
                "Accept": accept,
                "X-GitHub-Api-Version": "2022-11-28",
                "User-Agent": "sidegig-learning-collector",
                **({"Authorization": f"Bearer {self.token}"} if self.token else {}),
            },
        )
        try:
            with urllib.request.urlopen(request) as response:
                return json.load(response)
        except urllib.error.HTTPError as exc:
            body = exc.read().decode("utf-8", errors="replace")
            raise RuntimeError(f"GitHub API {exc.code} for {path}: {body}") from exc


def metadata_value(content: str, label: str) -> str | None:
    match = re.search(
        rf"(?m)^\*\*{re.escape(label)}:\*\*\s*(.+?)\s*$",
        content,
    )
    return match.group(1).strip() if match else None


def has_section(content: str, section: str) -> bool:
    return bool(re.search(rf"(?mi)^##\s+{re.escape(section)}\s*$", content))


def safe_name(value: str) -> str:
    value = value.strip().lower()
    value = re.sub(r"[^a-z0-9._-]+", "-", value)
    value = re.sub(r"-{2,}", "-", value).strip("-")
    if not value:
        raise ValueError("Learning ID cannot be converted into a safe file name.")
    return value


def read_existing_hash(path: pathlib.Path) -> str | None:
    if not path.is_file():
        return None
    content = path.read_text(encoding="utf-8")
    return metadata_value(content, "Source content SHA-256")


def validate_record(content: str, expected_repository: str, source_path: str) -> dict[str, str]:
    metadata: dict[str, str] = {}
    missing: list[str] = []

    for label in REQUIRED_METADATA:
        value = metadata_value(content, label)
        if not value:
            missing.append(label)
        else:
            metadata[label] = value

    for section in REQUIRED_SECTIONS:
        if not has_section(content, section):
            missing.append(f"section:{section}")

    if missing:
        raise ValueError(
            f"{expected_repository}/{source_path} is missing portable learning context: "
            + ", ".join(missing)
        )

    if metadata["Origin repository"].lower() != expected_repository.lower():
        raise ValueError(
            f"{expected_repository}/{source_path} declares Origin repository "
            f"{metadata['Origin repository']!r}."
        )

    if metadata["SideGig review"].strip().lower() not in {"yes", "no"}:
        raise ValueError(
            f"{expected_repository}/{source_path} has invalid SideGig review value "
            f"{metadata['SideGig review']!r}."
        )

    return metadata


def latest_path_commit(client: GithubClient, repository: str, branch: str, path: str) -> dict:
    query = urllib.parse.urlencode({"path": path, "sha": branch, "per_page": 1})
    commits = client.get(f"/repos/{repository}/commits?{query}")
    if not commits:
        raise RuntimeError(f"No commit history found for {repository}/{path} on {branch}.")
    return commits[0]


def associated_merged_pr(
    client: GithubClient, repository: str, commit_sha: str, branch: str
) -> dict | None:
    pulls = client.get(
        f"/repos/{repository}/commits/{commit_sha}/pulls",
        accept="application/vnd.github+json",
    )
    candidates = [
        pr
        for pr in pulls
        if pr.get("merged_at") and pr.get("base", {}).get("ref") == branch
    ]
    if not candidates:
        return None
    return sorted(candidates, key=lambda pr: pr.get("merged_at") or "", reverse=True)[0]


def collection_envelope(
    repository: str,
    branch: str,
    source_path: str,
    commit: dict,
    pull_request: dict | None,
    source_hash: str,
    collected_at: str,
) -> str:
    commit_sha = commit["sha"]
    commit_url = commit.get("html_url") or f"https://github.com/{repository}/commit/{commit_sha}"
    if pull_request:
        pr_value = f"#{pull_request['number']} ({pull_request['html_url']})"
    else:
        pr_value = "Not resolved automatically"

    return f"""# Collected SideGig Learning

**Origin repository:** {repository}

**Origin branch:** {branch}

**Origin learning path:** {source_path}

**Integrated commit:** {commit_sha} ({commit_url})

**Merged pull request:** {pr_value}

**Collected at:** {collected_at}

**Source content SHA-256:** {source_hash}

---

"""


def collect_source(
    client: GithubClient,
    source: dict,
    inbox_root: pathlib.Path,
    processed_root: pathlib.Path,
    dry_run: bool,
) -> tuple[int, int]:
    repository = source["repository"]
    branch = source.get("branch", "dev")
    learning_path = source.get("learningPath", "docs/learnings").strip("/")

    try:
        entries = client.get(
            f"/repos/{repository}/contents/{urllib.parse.quote(learning_path)}"
            f"?ref={urllib.parse.quote(branch)}"
        )
    except RuntimeError as exc:
        if "GitHub API 404" in str(exc):
            print(f"[collector] {repository}: no {learning_path} directory on {branch}")
            return 0, 0
        raise

    if not isinstance(entries, list):
        raise RuntimeError(f"{repository}/{learning_path} did not resolve to a directory.")

    collected = 0
    skipped = 0

    for entry in sorted(entries, key=lambda item: item.get("path", "")):
        if entry.get("type") != "file" or not entry.get("name", "").endswith(".md"):
            continue

        source_path = entry["path"]
        payload = client.get(
            f"/repos/{repository}/contents/{urllib.parse.quote(source_path)}"
            f"?ref={urllib.parse.quote(branch)}"
        )
        raw = base64.b64decode(payload["content"])
        content = raw.decode("utf-8")
        metadata = validate_record(content, repository, source_path)

        if metadata["SideGig review"].strip().lower() != "yes":
            skipped += 1
            continue

        source_hash = hashlib.sha256(raw).hexdigest().upper()
        learning_id = safe_name(metadata["Learning ID"])
        repo_folder = repository.replace("/", "--")
        inbox_path = inbox_root / repo_folder / f"{learning_id}.md"
        processed_path = processed_root / repo_folder / f"{learning_id}.md"

        if read_existing_hash(inbox_path) == source_hash:
            skipped += 1
            continue
        if read_existing_hash(processed_path) == source_hash:
            skipped += 1
            continue

        commit = latest_path_commit(client, repository, branch, source_path)
        pull_request = associated_merged_pr(client, repository, commit["sha"], branch)
        collected_at = dt.datetime.now(dt.timezone.utc).replace(microsecond=0).isoformat()
        output = (
            collection_envelope(
                repository,
                branch,
                source_path,
                commit,
                pull_request,
                source_hash,
                collected_at,
            )
            + content.rstrip()
            + "\n"
        )

        print(
            f"[collector] {repository}: collect {source_path} -> "
            f"{inbox_path.as_posix()}"
        )
        if not dry_run:
            inbox_path.parent.mkdir(parents=True, exist_ok=True)
            inbox_path.write_text(output, encoding="utf-8", newline="\n")
        collected += 1

    return collected, skipped


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--registry",
        default="development/learnings/sources.json",
        help="Path to the registered product-repository source list.",
    )
    parser.add_argument(
        "--inbox",
        default="development/learnings/inbox",
        help="Destination for pending centrally collected learnings.",
    )
    parser.add_argument(
        "--processed",
        default="development/learnings/processed",
        help="Location of already processed learnings used for idempotency.",
    )
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    registry = json.loads(pathlib.Path(args.registry).read_text(encoding="utf-8"))
    sources = registry.get("sources", [])
    if not isinstance(sources, list) or not sources:
        raise ValueError("Learning source registry contains no sources.")

    token = os.environ.get("SIDEGIG_LEARNING_TOKEN") or os.environ.get("GITHUB_TOKEN")
    api_url = os.environ.get("GITHUB_API_URL", "https://api.github.com")
    client = GithubClient(token, api_url)

    total_collected = 0
    total_skipped = 0
    for source in sources:
        collected, skipped = collect_source(
            client,
            source,
            pathlib.Path(args.inbox),
            pathlib.Path(args.processed),
            args.dry_run,
        )
        total_collected += collected
        total_skipped += skipped

    print(
        f"[collector] complete: collected={total_collected}, "
        f"skipped={total_skipped}, dry_run={args.dry_run}"
    )
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"[collector] ERROR: {exc}", file=sys.stderr)
        raise
