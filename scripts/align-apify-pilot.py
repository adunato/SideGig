from pathlib import Path
import re


def replace_once(text: str, old: str, new: str, label: str) -> str:
    if old not in text:
        raise RuntimeError(f"Expected text not found for {label}")
    return text.replace(old, new, 1)


# Align Apify overview with the canonical channel template.
overview_path = Path("research/channels/apify/overview.md")
overview = overview_path.read_text(encoding="utf-8")

overview = re.sub(r"^- \*\*Assessment status:\*\*.*\n", "", overview, flags=re.M)
overview = re.sub(r"^- \*\*Assessment date:\*\*.*\n", "", overview, flags=re.M)
overview = re.sub(r"^- \*\*Opportunity-area assessment:\*\*.*\n", "", overview, flags=re.M)

gateway_1 = """## Gateway 1 — Channel Selection

*Methodology mapping: Gateway 1 — Select Channels for Opportunity-Area Analysis.*

**Decision: Pass — proceed to Phase 2 opportunity-area analysis.**

Apify combines strong paying demand, credible independent-creator revenue, high production leverage and comparatively low platform-level operating burden. The channel assessment and community research also show that attractiveness varies materially inside the Store because demand, competition, discoverability and source-maintenance burden are uneven across product categories. That makes within-channel opportunity-area analysis both justified and necessary.

"""

overview = replace_once(
    overview,
    "## 4. Opportunity Landscape\n",
    gateway_1 + "## 4. Opportunity Landscape\n",
    "Gateway 1 placement",
)

overview = overview.replace(
    "*Methodology mapping: Phase 2, Steps 8 and 8A — assess opportunity areas and, where deep-dived, add opportunity-area community research.*",
    "*Methodology mapping: Phase 2, Steps 8 and 8A — assess opportunity areas and run opportunity-area community research.*",
)

start = overview.index("### 5.2 Assessment by opportunity area")
end = overview.index("## 6. Cross-Area Findings")
prefix = overview[:start]
section = overview[start:end]
suffix = overview[end:]

matches = list(re.finditer(r"(?m)^#### (.+)$", section))
parts = []
for i, match in enumerate(matches):
    block_start = match.start()
    block_end = matches[i + 1].start() if i + 1 < len(matches) else len(section)
    block = section[block_start:block_end].rstrip()
    area = match.group(1).strip()
    if "##### Community Findings" not in block:
        block += (
            "\n\n##### Community Findings\n\n"
            "<To be completed as part of Phase 2 opportunity-area community research.>"
        )
    parts.append((block_start, block_end, block))

if not parts:
    raise RuntimeError("No opportunity-area sections found in Apify overview")

rebuilt = section[:parts[0][0]]
for _, _, block in parts:
    rebuilt += block + "\n\n"
overview = prefix + rebuilt + suffix

overview_path.write_text(overview.rstrip() + "\n", encoding="utf-8")


# Align Apify capability document with the canonical capability template.
capability_path = Path("research/channels/apify/capability.md")
capability = capability_path.read_text(encoding="utf-8")

capability = re.sub(r"^- \*\*Assessment status:\*\*.*\n", "", capability, flags=re.M)
capability = re.sub(r"^- \*\*Assessment date:\*\*.*\n", "", capability, flags=re.M)

capability = replace_once(
    capability,
    "## Gateway 2 — Recruitment & Jobs Intelligence\n\n**Decision: Pass — selected for Phase 3 deep dive.**",
    "## Gateway 2 — Opportunity-Area Selection\n\n"
    "*Methodology mapping: Gateway 2 — Select Opportunity Areas for Deep Dive.*\n\n"
    "### Recruitment & jobs intelligence\n\n"
    "**Decision: Pass — selected for Phase 3 deep dive.**",
    "Gateway 2 structure",
)

capability = capability.replace(
    "\nThis records explicitly the Gateway 2 decision that was implicit in the already completed Recruitment & jobs deep dive.\n",
    "\n",
)
capability = re.sub(
    r"\n\*Methodology status: Phase 3 Steps 10–12 complete for this opportunity area\.[^\n]*\*\n",
    "\n",
    capability,
)

section_start = capability.index("## 2. Opportunity-Area Capability Requirements")
section_end = capability.index("## 3. Cross-Area Capability Findings")
section = capability[section_start:section_end]

# Remove empty opportunity-area headings. Only completed Phase 3 syntheses belong in this section.
section = re.sub(r"(?m)^### (?!Recruitment & jobs intelligence$)[^\n]+\n\n(?=### )", "", section)
section = re.sub(
    r"(?m)^### (?!Recruitment & jobs intelligence$)[^\n]+\n\n(?=## 3\. Cross-Area Capability Findings|\Z)",
    "",
    section,
)

# The final empty headings occur after the completed Recruitment section; remove any H3 block with no content.
lines = section.splitlines()
out = []
i = 0
while i < len(lines):
    if lines[i].startswith("### ") and lines[i] != "### Recruitment & jobs intelligence":
        j = i + 1
        while j < len(lines) and not lines[j].startswith("### "):
            if lines[j].startswith("#### ") or lines[j].strip():
                break
            j += 1
        if j >= len(lines) or (j < len(lines) and lines[j].startswith("### ")):
            i = j
            continue
    out.append(lines[i])
    i += 1
section = "\n".join(out).rstrip() + "\n\n"

capability = capability[:section_start] + section + capability[section_end:]

# Cross-area capability synthesis is not a separate step in the current methodology.
capability = re.sub(
    r"## 3\. Cross-Area Capability Findings\n\n.*?(?=## Sources)",
    "",
    capability,
    flags=re.S,
)

capability_path.write_text(capability.rstrip() + "\n", encoding="utf-8")
