---
name: Fahmi Haqqul Ihsan Portfolio
description: Swiss Specimen Wall portfolio system pairing warm bone exhibition surfaces with isolated dark telemetry vitrines.
colors:
  bone-ground: "#F6F5F0"
  specimen-plate: "#FAF9F5"
  drafting-ink: "#111317"
  slate-muted: "#4B525A"
  hairline-rule: "#D8D4CA"
  teal-signal: "#0F766E"
  vermilion-cutoff: "#B8381E"
  vitrine-obsidian: "#1E242C"
  vitrine-ink: "#E5E7EB"
  vitrine-muted: "#A3AEBC"
  vitrine-ok: "#7FD4C2"
  vitrine-alert: "#E8A394"
typography:
  display:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "4.625rem"
    fontWeight: 800
    lineHeight: 0.94
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0em"
  body:
    fontFamily: "Source Sans 3, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0em"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.06em"
rounded:
  none: "0px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
  xl: "80px"
components:
  button-primary:
    backgroundColor: "{colors.vermilion-cutoff}"
    textColor: "{colors.specimen-plate}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "#9A2D16"
  button-ink:
    backgroundColor: "{colors.drafting-ink}"
    textColor: "{colors.specimen-plate}"
    rounded: "{rounded.none}"
    padding: "6px 14px"
  button-ink-hover:
    backgroundColor: "{colors.teal-signal}"
  button-ghost:
    backgroundColor: "{colors.specimen-plate}"
    textColor: "{colors.drafting-ink}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
  chip-tech:
    backgroundColor: "{colors.bone-ground}"
    textColor: "{colors.drafting-ink}"
    rounded: "{rounded.none}"
    padding: "2px 8px"
  card-specimen:
    backgroundColor: "{colors.specimen-plate}"
    textColor: "{colors.drafting-ink}"
    rounded: "{rounded.none}"
    padding: "24px"
---

# Design System: Fahmi Haqqul Ihsan Portfolio

## Overview

**Creative North Star: "The Swiss Specimen Wall"**

The portfolio treats engineering work as calibrated exhibition specimens mounted on a crisp light drafting ground, punctuated by isolated dark telemetry vitrines wherever live execution traces or CLI tooling appear. Rather than relying on dark neon glow, soft shadows, or generic rounded card templates, visual hierarchy is established through sharp architectural scale, 1px hairline rules, and interactive inline SVG diagrams directly coupled to verified benchmark data.

**Key Characteristics:**
- Bright, readable exhibition paper surfaces contrasted strictly with isolated obsidian system vitrines.
- Flat zero-radius structural geometry bounded by crisp 1px borders and dot-grid analytical backgrounds.
- Zero arrows, zero emojis, and zero decorative eyebrows above headings.
- Low-end device empathy: self-hosted WOFF2 typography, lightweight inline SVG diagrams, and offscreen-paused intervals.

## Colors

A restrained high-contrast palette anchored on warm exhibition bone and drafting ink, with calibrated teal and deep vermilion signals reserved for data boundaries and primary actions.

### Primary
- **Teal Signal** (`#0F766E`): Marks calibrated model states, verified statistical frontiers, active analytical nodes, and selection highlights.
- **Vermilion Cutoff** (`#B8381E`): Marks the primary hero action, live deployment links, and baseline comparison thresholds while preserving >= 4.5:1 WCAG AA contrast.

### Secondary
- **Vitrine Mint** (`#7FD4C2`): Highlights passing execution traces, streaming nodes, and the primary email-copy action inside isolated dark vitrines.
- **Vitrine Coral** (`#E8A394`): Marks anomaly thresholds and multi-stage agent triggers inside isolated dark telemetry blocks.

### Neutral
- **Bone Ground** (`#F6F5F0`): Primary page canvas and secondary dot-grid base.
- **Specimen Plate** (`#FAF9F5`): Elevated light paper surface for cards, buttons, and technical stack containers.
- **Drafting Ink** (`#111317`): Primary headings, strong structural borders, and active filter buttons.
- **Slate Muted** (`#4B525A`): Supporting descriptions, metadata, and secondary labels.
- **Hairline Rule** (`#D8D4CA`): Structural dividers and non-active container borders.
- **Vitrine Slate** (`#1E242C`): Softened charcoal-slate container ground for live system logs, EquiSentinel DAGs, and the closing career-archive footer.

**The Isolated Vitrine Rule.** Dark slate surfaces (`#1E242C`) appear only for self-contained system traces, CLI headers, and the closing contact band—never as a full-page mode switch.

## Typography

**Display Font:** Archivo (self-hosted WOFF2 via `@fontsource/archivo`, fallback `system-ui, -apple-system, sans-serif`)
**Body Font:** Source Sans 3 (self-hosted WOFF2 via `@fontsource/source-sans-3`, fallback `system-ui, -apple-system, sans-serif`)
**Label/Mono Font:** JetBrains Mono (self-hosted WOFF2 via `@fontsource/jetbrains-mono`, fallback `ui-monospace, monospace`)

**Character:** Monumental, tight-tracked display headlines establish gallery authority while humanist sans prose keeps long technical bullets comfortable to scan alongside tabular monospace benchmarks.

### Hierarchy
- **Display** (800, up to `4.625rem` / `74px`, line-height `0.94`, tracking `-0.035em`): Hero identity title.
- **Headline** (800, `1.875rem–2.25rem`, line-height `1.1`, tracking `-0.02em`): Section titles.
- **Title** (700, `1.125rem–1.25rem`, line-height `1.3`): Project, experience, and honor headings.
- **Body** (400, `1rem`, line-height `1.6`, max measure `65ch`): Summaries and technical highlights.
- **Label** (600, `0.6875rem–0.75rem`, tracking `0.04em–0.08em`, uppercase monospace): Metrics, category tags, filters, and buttons.

**The No-Eyebrow Rule.** Headings always lead on their own; dates, specimen codes, and location metadata sit inline or beneath the heading, never as an uppercase kicker above it.

## Layout

Content spans full viewport width with generous edge gutters (`px-6` mobile, `sm:px-10`, `lg:px-14`, `xl:px-20`). Sections alternate rhythm cleanly: an asymmetric split hero pairing editorial identity with an interactive Canvas 2D neural inference visual and bottom vitrine, a sticky two-column scrollytelling architecture walkthrough (`#pipeline`), a non-flickering About-to-Systems bipartite bridge, a 3-column featured DS/AI grid paired with a multi-column secondary grid, an Experience and Honors ledger, and a dual-row alternating-direction icon marquee for Technical Stack above the closing archive footer.

## Elevation & Depth

Strictly flat tonal layering with zero drop shadows and zero `backdrop-filter: blur` layers. Depth and separation rely exclusively on surface value shifts (`#F6F5F0` vs. `#FAF9F5` vs. `#1E242C`) and `1px` crisp borders (`#D8D4CA` at rest, `#111317` on featured frames and active states).

**The Zero-Shadow Rule.** Elevation is communicated through border contrast and surface inversion, never through blurred shadows or glassmorphism.

## Shapes

Sharp rectangular `0px` corners across all buttons, cards, badges, and SVG nodes. Dot-grid texture (`radial-gradient` 1px dots at `18px` pitch) marks interactive analytical chart plates.

## Components

### Buttons
- **Shape:** Sharp rectangular corners (`0px`).
- **Primary:** Vermilion background (`#B8381E`), Specimen Plate text (`#FAF9F5`), uppercase monospace `12px`, `12px 20px` padding.
- **Hover / Focus:** Transitions crisply to darker vermilion (`#9A2D16`) or Teal Signal (`#0F766E`); keyboard focus renders a `2px` solid `#0F766E` ring with `2px` offset.
- **Secondary / Ghost:** Specimen Plate background (`#FAF9F5`) with `1px solid #111317` border, inverting to Drafting Ink (`#111317`) on hover or active toggle (`aria-pressed="true"`).

### Chips
- **Style:** Bone Ground (`#F6F5F0`) fill, `1px solid #D8D4CA` border, `11px` monospace text, `2px 8px` padding.
- **State:** Static metadata tags with sharp tabular alignment.

### Cards / Containers
- **Corner Style:** Sharp `0px` corners.
- **Background:** Specimen Plate (`#FAF9F5`) for primary content; Vitrine Obsidian (`#12151C`) for isolated trace containers.
- **Shadow Strategy:** Zero shadows; `1px solid #111317` borders distinguish featured DS/AI specimens from `1px solid #D8D4CA` secondary cards.
- **Internal Padding:** `16px` (`p-4`) on inline visual headers, `20px–24px` (`p-5` / `p-6`) on card bodies.

### Navigation
- Sticky `56px` bar (`#F6F5F0`) with `1px` bottom rule, uppercase monospace section links, solid Drafting Ink CV download action, and an accessible `Escape`-closable mobile drawer below `768px`.

### Telemetry Vitrine
- Isolated dark band (`#12151C`) displaying stepped trace rows gated by `IntersectionObserver` and `prefers-reduced-motion: reduce`, preserving `>= 4.5:1` foreground contrast on all active and inactive lines.

## Do's and Don'ts

### Do:
- **Do** keep every interactive SVG diagram grounded in verified sample sizes and totals from `PRODUCT.md`.
- **Do** pair `aria-pressed` and `2px solid #0F766E` focus rings with every interactive domain, node, and filter button.
- **Do** pause interval-driven trace cycling whenever the element is offscreen, hidden, or `prefers-reduced-motion: reduce` is active.

### Don't:
- **Don't** introduce arrow glyphs (`→`, `↓`, `↗`), emojis, or decorative symbol dots (`●`, `•`) in UI copy or buttons.
- **Don't** place uppercase eyebrows above headings or use `border-left`/`border-right` thicker than `1px` as card decoration.
- **Don't** add WebGL shaders, `backdrop-filter: blur`, or heavy box shadows that degrade low-end mobile performance.
