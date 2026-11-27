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

<section id="top" class="border-b border-[var(--rule)] bg-[var(--bg-bone)]">
	<div class="grid w-full grid-cols-1 items-center gap-10 px-6 py-14 sm:px-10 sm:py-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14 lg:px-14 lg:py-20 xl:px-20">
		<div class="flex flex-col justify-center">
			<h1
				class="font-display text-5xl leading-[0.95] font-extrabold tracking-[-0.035em] text-[var(--ink)] sm:text-6xl xl:text-[74px]"
			>
				Fahmi<br />Haqqul<br />Ihsan
			</h1>
			<p class="mt-6 max-w-[58ch] text-lg leading-relaxed text-[var(--ink-muted)] sm:text-[19px]">
				{PROFILE.bio}
			</p>
			<div class="mt-8">
				<a
					href="#projects"
					class="font-mono-tech inline-block rounded-full bg-[var(--vermilion)] px-6 py-3 text-xs font-semibold text-[var(--bg-plate)] transition-colors hover:bg-[#9A2D16]"
				>
					Explore All Projects
				</a>
			</div>
		</div>

		<div class="rounded-3xl border border-[var(--rule)] bg-[var(--bg-plate)] p-5 sm:p-7">
			<div class="pb-3 font-mono-tech text-xs font-medium text-[var(--ink-muted)]">
				Live Inference &amp; Pipeline Network
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
