# Research Methodology

## Status

Draft. This document defines the research process incrementally as each step is agreed.

## Step 1 — Define the Channel Assessment Framework

Establish the criteria used to assess and compare channels consistently before channel discovery begins.

The canonical framework is defined in [channel-assessment-framework.md](channel-assessment-framework.md).

## Step 2 — Define Channel Classes

Identify the broad classes of channels that should be investigated.

For each channel class, record:

- Channel class name
- Description

Channel classes are maintained in [channel-classes.md](channel-classes.md).

## Step 3 — Identify Research Sources by Channel Class

For each channel class, run a distinct research activity to identify the sources that can be used to discover channels within that class.

Record the research sources directly under the relevant class in [channel-classes.md](channel-classes.md).

This step establishes where channel discovery will be performed before the discovery pass begins.

## Step 4 — Discover Channels

For each channel class, work through its identified research sources and identify candidate channels.

For every channel discovered:

1. Add the channel to the master index in [channels.md](channels.md).
2. Create an individual channel document in [`channels/`](channels/) using [templates/channel-template.md](templates/channel-template.md).
3. Record the channel class and a descriptive paragraph explaining what the channel is, what it enables sellers to offer, and the market it provides access to.

This is a discovery pass only. The channel assessment is not populated during this step. Each channel document is created as a skeleton that can be expanded incrementally by later research steps.

## Step 5 — Assess Channels

For every discovered channel, research and populate the Channel Assessment section of its individual channel document.

The assessment must use the criteria and scoring defined in [channel-assessment-framework.md](channel-assessment-framework.md), with supporting evidence retained in the channel document.

Update [channels.md](channels.md) to reflect the channel's assessment status.

Discovery and assessment are separate passes so that the landscape is mapped before channels are evaluated.