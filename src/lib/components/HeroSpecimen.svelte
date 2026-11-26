<script lang="ts">
	import TelemetryVitrine from '$lib/components/TelemetryVitrine.svelte';
	import {
		HERO_DOMAINS,
		HERO_TELEMETRY_LINES,
		PROFILE,
		getHeroDomainSummary,
		type HeroDomainId
	} from '$lib/data/portfolio';
	import { getDomainTopologyHighlight } from '$lib/utils/interactions';

	let activeDomain = $state<HeroDomainId>('statistical-ml');
	const domainSummary = $derived(getHeroDomainSummary(activeDomain));
	const highlightedNodes = $derived(getDomainTopologyHighlight(activeDomain));

	function isActive(nodeId: string): boolean {
		return highlightedNodes.includes(nodeId);
	}
</script>

<section id="top" class="border-b border-[var(--rule)] bg-[var(--bg-bone)]">
	<div class="mx-auto grid max-w-[1360px] grid-cols-1 lg:grid-cols-[1.06fr_0.94fr]">
		<div
			class="flex flex-col justify-between border-b border-[var(--rule)] px-5 py-10 sm:px-8 sm:py-12 lg:border-r lg:border-b-0"
		>
			<div>
				<h1
					class="font-display text-5xl leading-[0.94] font-extrabold tracking-[-0.035em] text-[var(--ink)] uppercase sm:text-6xl xl:text-[74px]"
				>
					Fahmi<br />Haqqul<br />Ihsan
				</h1>
				<p class="font-mono-tech mt-4 text-xs tracking-[0.06em] text-[var(--teal)] uppercase">
					{PROFILE.location} | {PROFILE.university} Software Eng | GPA {PROFILE.gpa}
				</p>
				<p class="mt-5 max-w-[560px] text-lg leading-relaxed text-[#2A2E35] sm:text-[20px]">
					{PROFILE.bio}
				</p>
				<div class="mt-7 flex flex-wrap gap-3">
					<a
						href="#projects"
						class="font-mono-tech bg-[var(--vermilion)] px-5 py-3 text-xs font-semibold tracking-[0.06em] text-[var(--bg-plate)] uppercase transition-colors hover:bg-[#b8381e]"
					>
						Explore All Projects
					</a>
					<a
						href="#contact"
						class="font-mono-tech border border-[var(--ink)] bg-[var(--bg-plate)] px-5 py-3 text-xs font-medium tracking-[0.05em] text-[var(--ink)] uppercase transition-colors hover:bg-[var(--ink)] hover:text-[var(--bg-plate)]"
					>
						Email / GitHub / LinkedIn
					</a>
				</div>
			</div>

			<div class="mt-10 grid grid-cols-1 gap-5 border-t border-[var(--rule)] pt-5 sm:grid-cols-3">
				<div>
					<div class="font-mono-tech text-[11px] tracking-[0.05em] text-[var(--ink-muted)] uppercase">
						Conformal (alpha = 0.05)
					</div>
					<div class="font-display mt-1 text-2xl font-bold text-[var(--ink)] tabular-nums">
						1.96% FAR
					</div>
					<div class="mt-0.5 text-sm text-[var(--ink-muted)]">Down from 13.52% on RAGTruth</div>
				</div>
				<div>
					<div class="font-mono-tech text-[11px] tracking-[0.05em] text-[var(--ink-muted)] uppercase">
						Causal DR-Learner
					</div>
					<div class="font-display mt-1 text-2xl font-bold text-[var(--ink)] tabular-nums">
						$2,679.37
					</div>
					<div class="mt-0.5 text-sm text-[var(--ink-muted)]">+75% net profit vs propensity</div>
				</div>
				<div>
					<div class="font-mono-tech text-[11px] tracking-[0.05em] text-[var(--ink-muted)] uppercase">
						National Honors
					</div>
					<div class="font-display mt-1 text-2xl font-bold text-[var(--ink)] tabular-nums">
						2 Podiums
					</div>
					<div class="mt-0.5 text-sm text-[var(--ink-muted)]">UNS Data Viz &amp; UI Datathon</div>
				</div>
			</div>
		</div>

		<div class="specimen-dot-grid flex flex-col justify-between px-5 py-8 sm:px-8 sm:py-10">
			<div class="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--ink)] pb-3">
				<span class="font-mono-tech text-xs font-medium tracking-[0.04em] text-[var(--ink)] uppercase">
					AI &amp; Systems Topology
				</span>
				<span class="font-mono-tech text-xs font-semibold text-[var(--teal)]">
					{domainSummary.label}
				</span>
			</div>

			<div class="my-5 flex flex-wrap gap-2" role="group" aria-label="Select capability domain">
				{#each HERO_DOMAINS as domain}
					<button
						type="button"
						aria-pressed={activeDomain === domain.id}
						onclick={() => (activeDomain = domain.id)}
						class="font-mono-tech border px-3 py-1.5 text-xs tracking-[0.04em] uppercase transition-colors"
						class:border-[var(--ink)]={activeDomain === domain.id}
						class:bg-[var(--ink)]={activeDomain === domain.id}
						class:text-[var(--bg-plate)]={activeDomain === domain.id}
						class:border-[var(--rule)]={activeDomain !== domain.id}
						class:bg-[var(--bg-plate)]={activeDomain !== domain.id}
						class:text-[var(--ink)]={activeDomain !== domain.id}
					>
						{domain.label}
					</button>
				{/each}
			</div>

			<div class="border border-[var(--ink)] bg-[var(--bg-plate)] p-4">
				<svg
					viewBox="0 0 540 270"
					class="h-auto w-full"
					role="img"
					aria-label="Interactive topology connecting Data Science, Causal ML, and Production Backend Systems"
				>
					<line
						x1="138"
						y1="62"
						x2="268"
						y2="135"
						stroke={isActive('ml-conformal') ? '#0F766E' : '#CFCAC0'}
						stroke-width={isActive('ml-conformal') ? '2.5' : '1.4'}
					/>
					<line
						x1="138"
						y1="135"
						x2="268"
						y2="135"
						stroke={isActive('ml-causal') ? '#0F766E' : '#CFCAC0'}
						stroke-width={isActive('ml-causal') ? '2.5' : '1.4'}
					/>
					<line
						x1="138"
						y1="208"
						x2="268"
						y2="135"
						stroke={isActive('ml-langgraph') ? '#B8381E' : '#CFCAC0'}
						stroke-width={isActive('ml-langgraph') ? '2.5' : '1.4'}
					/>
					<line
						x1="272"
						y1="135"
						x2="402"
						y2="62"
						stroke={isActive('sys-fastapi') ? '#0F766E' : '#CFCAC0'}
						stroke-width={isActive('sys-fastapi') ? '2.5' : '1.4'}
					/>
					<line
						x1="272"
						y1="135"
						x2="402"
						y2="135"
						stroke={isActive('sys-duckdb') ? '#0F766E' : '#CFCAC0'}
						stroke-width={isActive('sys-duckdb') ? '2.5' : '1.4'}
					/>
					<line
						x1="272"
						y1="135"
						x2="402"
						y2="208"
						stroke={isActive('sys-go-nats') ? '#B8381E' : '#CFCAC0'}
						stroke-width={isActive('sys-go-nats') ? '2.5' : '1.4'}
					/>

					<g>
						<rect
							x="16"
							y="38"
							width="124"
							height="46"
							fill={isActive('ml-conformal') ? '#0F766E' : '#F6F5F0'}
							stroke="#111317"
							stroke-width="1.5"
						/>
						<text
							x="28"
							y="65"
							font-family="JetBrains Mono"
							font-size="11"
							fill={isActive('ml-conformal') ? '#FAF9F5' : '#111317'}
						>
							MAPIE CONFORMAL
						</text>
					</g>

					<g>
						<rect
							x="16"
							y="112"
							width="124"
							height="46"
							fill={isActive('ml-causal') ? '#0F766E' : '#F6F5F0'}
							stroke="#111317"
							stroke-width="1.5"
						/>
						<text
							x="28"
							y="139"
							font-family="JetBrains Mono"
							font-size="11"
							fill={isActive('ml-causal') ? '#FAF9F5' : '#111317'}
						>
							ECONML UPLIFT
						</text>
					</g>

					<g>
						<rect
							x="16"
							y="186"
							width="124"
							height="46"
							fill={isActive('ml-langgraph') ? '#B8381E' : '#F6F5F0'}
							stroke="#111317"
							stroke-width="1.5"
						/>
						<text
							x="28"
							y="213"
							font-family="JetBrains Mono"
							font-size="11"
							fill={isActive('ml-langgraph') ? '#FAF9F5' : '#111317'}
						>
							LANGGRAPH DAG
						</text>
					</g>

					<rect x="218" y="102" width="104" height="66" fill="#12151C" stroke="#111317" />
					<text x="234" y="131" font-family="JetBrains Mono" font-size="11" fill="#34D399">
						CALIBRATION
					</text>
					<text x="234" y="149" font-family="JetBrains Mono" font-size="10" fill="#E6EAF0">
						&amp; POLICY CORE
					</text>

					<g>
						<rect
							x="400"
							y="38"
							width="124"
							height="46"
							fill={isActive('sys-fastapi') ? '#111317' : '#F6F5F0'}
							stroke="#111317"
							stroke-width="1.5"
						/>
						<text
							x="412"
							y="65"
							font-family="JetBrains Mono"
							font-size="11"
							fill={isActive('sys-fastapi') ? '#FAF9F5' : '#111317'}
						>
							FASTAPI + FAISS
						</text>
					</g>

					<g>
						<rect
							x="400"
							y="112"
							width="124"
							height="46"
							fill={isActive('sys-duckdb') ? '#111317' : '#F6F5F0'}
							stroke="#111317"
							stroke-width="1.5"
						/>
						<text
							x="412"
							y="139"
							font-family="JetBrains Mono"
							font-size="11"
							fill={isActive('sys-duckdb') ? '#FAF9F5' : '#111317'}
						>
							DUCKDB + PULP
						</text>
					</g>

					<g>
						<rect
							x="400"
							y="186"
							width="124"
							height="46"
							fill={isActive('sys-go-nats') ? '#111317' : '#F6F5F0'}
							stroke="#111317"
							stroke-width="1.5"
						/>
						<text
							x="412"
							y="213"
							font-family="JetBrains Mono"
							font-size="11"
							fill={isActive('sys-go-nats') ? '#FAF9F5' : '#111317'}
						>
							GO + NATS + DAG
						</text>
					</g>
				</svg>
			</div>

			<div class="mt-4 border-t border-[var(--rule)] pt-3">
				<div class="font-mono-tech text-xs font-semibold text-[var(--ink)]">
					{domainSummary.linkedProject}
				</div>
				<div class="mt-1 text-sm text-[var(--ink-muted)]">{domainSummary.roleNote}</div>
				<div class="font-mono-tech mt-1.5 text-xs text-[var(--teal)]">
					{domainSummary.highlightMetric}
				</div>
			</div>
		</div>
	</div>

	<TelemetryVitrine
		title="Isolated Telemetry Vitrine"
		subtitle="Verified Model & Stream Traces"
		lines={HERO_TELEMETRY_LINES}
		rightLabel="Internship Target"
		rightSublabel="DS & AI (Primary) / SWE (Secondary)"
	/>
</section>
