<script lang="ts">
	import NeuralCanvas from '$lib/components/NeuralCanvas.svelte';
	import {
		HERO_DOMAINS,
		PROFILE,
		getHeroDomainSummary,
		type HeroDomainId
	} from '$lib/data/portfolio';

	let activeDomain = $state<HeroDomainId>('statistical-ml');
	const domainSummary = $derived(getHeroDomainSummary(activeDomain));
</script>

<section id="top" class="border-b border-[var(--rule)]/80">
	<div class="grid w-full grid-cols-1 items-center gap-10 px-6 py-14 sm:px-10 sm:py-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14 lg:px-14 lg:py-20 xl:px-20">
		<div class="flex flex-col justify-between">
			<div>
				<h1
					class="font-display text-4xl leading-[1.03] font-extrabold tracking-[-0.03em] text-[var(--ink)] sm:text-5xl xl:text-[62px]"
				>
					Building AI systems and resilient software end to end.
				</h1>
				<p class="mt-5 max-w-[58ch] text-lg leading-relaxed text-[var(--ink-muted)] sm:text-[19px]">
					I&apos;m {PROFILE.name}, a {PROFILE.bio}
				</p>
				<div class="mt-8 flex flex-wrap gap-3">
					<a
						href="#projects"
						class="font-mono-tech rounded-full bg-[var(--teal)] px-6 py-3 text-xs font-semibold text-[var(--bg-plate)] transition-colors hover:bg-[#0B5E58]"
					>
						Explore All Projects
					</a>
					<a
						href="#contact"
						class="font-mono-tech rounded-full border border-[var(--rule)] bg-[var(--bg-plate)] px-6 py-3 text-xs font-medium text-[var(--ink)] transition-colors hover:border-[var(--ink)]"
					>
						Email / GitHub / LinkedIn
					</a>
				</div>
			</div>

			<div class="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
				<div class="rounded-2xl border border-[var(--rule)] bg-[var(--bg-plate)] p-4">
					<div class="font-mono-tech text-[11px] font-medium text-[var(--ink-muted)]">
						AI &amp; Causal R&amp;D
					</div>
					<div class="font-display mt-1 text-2xl font-bold text-[var(--ink)] tabular-nums">
						1.96% FAR
					</div>
					<div class="mt-0.5 text-xs text-[var(--ink-muted)]">Conformal bounds &amp; $2,679.37 uplift</div>
				</div>
				<div class="rounded-2xl border border-[var(--rule)] bg-[var(--bg-plate)] p-4">
					<div class="font-mono-tech text-[11px] font-medium text-[var(--ink-muted)]">
						Client &amp; SWE Delivery
					</div>
					<div class="font-display mt-1 text-2xl font-bold text-[var(--ink)] tabular-nums">
						3 Client Apps
					</div>
					<div class="mt-0.5 text-xs text-[var(--ink-muted)]">Web platforms &amp; 4 open-source tools</div>
				</div>
				<div class="rounded-2xl border border-[var(--rule)] bg-[var(--bg-plate)] p-4">
					<div class="font-mono-tech text-[11px] font-medium text-[var(--ink-muted)]">
						Competitions &amp; Honors
					</div>
					<div class="font-display mt-1 text-2xl font-bold text-[var(--ink)] tabular-nums">
						2 Podiums
					</div>
					<div class="mt-0.5 text-xs text-[var(--ink-muted)]">UNS Data Viz &amp; UI Datathon</div>
				</div>
			</div>
		</div>

		<div class="rounded-3xl border border-[var(--rule)] bg-[var(--bg-plate)] p-5 sm:p-7">
			<div class="flex flex-wrap items-center justify-between gap-2 pb-3">
				<span class="font-mono-tech text-xs font-medium text-[var(--ink-muted)]">
					Interactive Neural &amp; Pipeline Topology
				</span>
				<span class="font-mono-tech rounded-full bg-[var(--bg-bone)] px-3 py-1 text-[11px] font-semibold text-[var(--teal)]">
					{domainSummary.label}
				</span>
			</div>

			<div class="mb-4 flex flex-wrap gap-2" role="group" aria-label="Select capability domain">
				{#each HERO_DOMAINS as domain}
					<button
						type="button"
						aria-pressed={activeDomain === domain.id}
						onclick={() => (activeDomain = domain.id)}
						class="font-mono-tech rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors"
						class:border-[var(--ink)]={activeDomain === domain.id}
						class:bg-[var(--ink)]={activeDomain === domain.id}
						class:text-[var(--bg-plate)]={activeDomain === domain.id}
						class:border-[var(--rule)]={activeDomain !== domain.id}
						class:bg-[var(--bg-bone)]={activeDomain !== domain.id}
						class:text-[var(--ink-muted)]={activeDomain !== domain.id}
					>
						{domain.label}
					</button>
				{/each}
			</div>

			<NeuralCanvas {activeDomain} />

			<div class="mt-4 rounded-2xl bg-[var(--bg-bone)] p-4">
				<div class="font-mono-tech text-xs font-semibold text-[var(--ink)]">
					{domainSummary.linkedProject}
				</div>
				<div class="mt-1 text-sm text-[var(--ink-muted)]">{domainSummary.roleNote}</div>
				<div class="font-mono-tech mt-1.5 text-xs font-medium text-[var(--teal)]">
					{domainSummary.highlightMetric}
				</div>
			</div>
		</div>
	</div>
</section>
