<script lang="ts">
	import NeuralCanvas from '$lib/components/NeuralCanvas.svelte';
	import TelemetryVitrine from '$lib/components/TelemetryVitrine.svelte';
	import {
		HERO_DOMAINS,
		HERO_TELEMETRY_LINES,
		PROFILE,
		getHeroDomainSummary,
		type HeroDomainId
	} from '$lib/data/portfolio';

	let activeDomain = $state<HeroDomainId>('statistical-ml');
	const domainSummary = $derived(getHeroDomainSummary(activeDomain));
</script>

<section id="top" class="border-b border-[var(--rule)] bg-[var(--bg-bone)]">
	<div class="grid w-full grid-cols-1 lg:grid-cols-[1.04fr_0.96fr]">
		<div
			class="flex flex-col justify-between border-b border-[var(--rule)] px-6 py-10 sm:px-10 sm:py-12 lg:border-r lg:border-b-0 lg:px-14 xl:px-20"
		>
			<div>
				<h1
					class="font-display text-5xl leading-[0.94] font-extrabold tracking-[-0.035em] text-[var(--ink)] uppercase sm:text-6xl xl:text-[78px]"
				>
					Fahmi<br />Haqqul<br />Ihsan
				</h1>
				<p class="mt-6 max-w-[60ch] text-lg leading-relaxed text-[#2A2E35] sm:text-[20px]">
					{PROFILE.bio}
				</p>
				<div class="mt-7 flex flex-wrap gap-3">
					<a
						href="#projects"
						class="font-mono-tech bg-[var(--vermilion)] px-5 py-3 text-xs font-semibold tracking-[0.06em] text-[var(--bg-plate)] uppercase transition-colors hover:bg-[#9A2D16]"
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

		<div class="specimen-dot-grid flex flex-col justify-between px-6 py-8 sm:px-10 sm:py-10 lg:px-14 xl:px-16">
			<div class="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--ink)] pb-3">
				<span class="font-mono-tech text-xs font-medium tracking-[0.04em] text-[var(--ink)] uppercase">
					Live Inference &amp; Calibration Network
				</span>
				<span class="font-mono-tech text-xs font-semibold text-[var(--teal)]">
					{domainSummary.label}
				</span>
			</div>

			<div class="my-4 flex flex-wrap gap-2" role="group" aria-label="Select capability domain">
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

			<NeuralCanvas {activeDomain} />

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
		rightLabel="Career Archive"
		rightSublabel="Data Science, AI & Software Eng"
	/>
</section>
