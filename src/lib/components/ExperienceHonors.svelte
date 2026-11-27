<script lang="ts">
	import { EXPERIENCE_ITEMS, HONOR_ITEMS, LEADERSHIP_ITEM } from '$lib/data/portfolio';

	let activeRunIndex = $state(0);
	let activeHonorIndex = $state(0);

	interface TimelineRun {
		id: string;
		label: string;
		period: string;
		status: 'running' | 'finished';
		colStart: number;
		colSpan: number;
		checkpoints: string[];
	}

	const MONTHS = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Now'];

	const RUNS: TimelineRun[] = [
		{
			id: 'smart-school',
			label: 'Smart School Platform',
			period: 'Jul 2026',
			status: 'finished',
			colStart: 6,
			colSpan: 1,
			checkpoints: ['AI Suite']
		},
		{
			id: 'localive',
			label: 'Localive Platform',
			period: 'Jul 2026',
			status: 'finished',
			colStart: 6,
			colSpan: 1,
			checkpoints: ['ID/EN API']
		},
		{
			id: 'jogja-tour',
			label: 'Jogja Tour Borobudur',
			period: 'Feb - Mar 2026',
			status: 'finished',
			colStart: 1,
			colSpan: 2,
			checkpoints: ['MySQL / JSON']
		},
		{
			id: 'assets-ugm',
			label: 'ASSETS UGM (Tech Dev)',
			period: 'Feb 2026 - Present',
			status: 'running',
			colStart: 1,
			colSpan: 9,
			checkpoints: ['ML Mentorship']
		}
	];

	const activeHonor = $derived(HONOR_ITEMS[activeHonorIndex] ?? HONOR_ITEMS[0]);
</script>

<section id="experience" class="scroll-mt-16 border-b border-[var(--rule)] bg-[var(--bg-bone)]">
	<div class="w-full px-6 py-20 sm:px-10 lg:px-14 lg:py-24 xl:px-20">
		<div class="flex flex-col justify-between gap-4 border-b border-[var(--rule)] pb-6 md:flex-row md:items-end">
			<div>
				<h2 class="font-display text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-4xl">
					Experience &amp; Honors
				</h2>
				<p class="mt-2 max-w-[65ch] text-base text-[var(--ink-muted)]">
					Production client deployments, technical mentorship at UGM, and competition awards.
				</p>
			</div>

			<div class="font-mono-tech flex items-center gap-3 text-xs text-[var(--ink-muted)]">
				<span class="flex items-center gap-2 rounded-full border border-[var(--rule)] bg-[var(--bg-plate)] px-3.5 py-1.5 text-[var(--ink)]">
					<span class="relative grid h-2 w-2 place-items-center" aria-hidden="true">
						<span class="exp-live-ping absolute inset-0 rounded-full bg-[var(--teal)]"></span>
						<span class="relative h-2 w-2 rounded-full bg-[var(--teal)]"></span>
					</span>
					1 Active / 3 Shipped
				</span>
			</div>
		</div>

		<!-- Minimal Execution Timeline (desktop clean Gantt track without heavy grid lines) -->
		<div class="mt-8 hidden overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--bg-plate)] md:block">
			<div class="grid min-w-[760px] grid-cols-[14.5rem_minmax(0,1fr)]">
				<div class="flex h-10 items-center border-b border-[var(--rule)] px-5 font-mono-tech text-[11px] font-medium text-[var(--ink-muted)]">
					Timeline (2026)
				</div>
				<div class="grid h-10 grid-cols-9 border-b border-[var(--rule)]">
					{#each MONTHS as month}
						<div class="flex items-center px-3 font-mono-tech text-[11px] text-[var(--ink-muted)]">
							{month}
						</div>
					{/each}
				</div>

				{#each RUNS as run, idx}
					<button
						type="button"
						onclick={() => (activeRunIndex = idx)}
						onpointerenter={() => (activeRunIndex = idx)}
						aria-pressed={activeRunIndex === idx}
						class="flex items-center justify-between border-b border-[var(--rule)]/60 px-5 py-3 text-left transition-colors last:border-b-0"
						class:bg-[var(--bg-bone)]={activeRunIndex === idx}
					>
						<span class="font-mono-tech truncate text-xs font-medium text-[var(--ink)]">{run.label}</span>
						<span
							class="ml-2 h-2 w-2 shrink-0 rounded-full"
							class:bg-[var(--teal)]={run.status === 'running' || activeRunIndex === idx}
							class:bg-[var(--rule)]={run.status !== 'running' && activeRunIndex !== idx}
						></span>
					</button>

					<div class="relative grid grid-cols-9 items-center border-b border-[var(--rule)]/60 py-2.5 pr-2 last:border-b-0">
						<div class="pointer-events-none col-span-9 grid grid-cols-9 items-center px-1.5">
							<div
								style={`grid-column: ${run.colStart} / span ${run.colSpan};`}
								class="flex h-6 items-center justify-between rounded-full border px-3 font-mono-tech text-[10px] transition-all duration-300"
								class:border-[var(--teal)]={activeRunIndex === idx || run.status === 'running'}
								class:bg-[var(--teal)]={run.status === 'running'}
								class:text-[var(--bg-plate)]={run.status === 'running'}
								class:bg-[var(--bg-bone)]={run.status !== 'running'}
								class:text-[var(--ink)]={run.status !== 'running'}
								class:border-[var(--rule)]={activeRunIndex !== idx && run.status !== 'running'}
							>
								<span class="truncate">{run.checkpoints.join(' / ')}</span>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Clean Lower Split: Minimal Experience Cards (Left) + Clean Honors & ASSETS UGM Cards (Right) -->
		<div class="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_0.85fr]">
			<div class="space-y-4">
				{#each EXPERIENCE_ITEMS as item, idx}
					<article
						class="rounded-2xl border bg-[var(--bg-plate)] p-6 transition-colors duration-200"
						class:border-[var(--teal)]={activeRunIndex === idx}
						class:border-[var(--rule)]={activeRunIndex !== idx}
						onpointerenter={() => (activeRunIndex = idx)}
					>
						<div class="flex flex-wrap items-baseline justify-between gap-2">
							<h3 class="font-display text-xl font-bold text-[var(--ink)]">
								{item.organization}
							</h3>
							<span class="font-mono-tech rounded-full bg-[var(--bg-bone)] px-3 py-0.5 text-[11px] font-medium text-[var(--teal)]">
								{item.period}
							</span>
						</div>
						<div class="mt-1 text-xs font-medium text-[var(--ink-muted)]">
							{item.role} / {item.location}
						</div>

						<ul class="mt-3.5 space-y-2 text-sm leading-relaxed text-[#2A2E35]">
							{#each item.highlights as point}
								<li>{point}</li>
							{/each}
						</ul>

						{#if item.liveUrl || item.repoUrl}
							<div class="mt-4 flex items-center gap-3">
								{#if item.liveUrl}
									<a
										href={item.liveUrl}
										target="_blank"
										rel="noopener noreferrer"
										class="font-mono-tech rounded-full bg-[var(--vermilion)] px-4 py-1.5 text-[11px] font-semibold text-[var(--bg-plate)] transition-colors hover:bg-[#9A2D16]"
									>
										Live Site
									</a>
								{/if}
								{#if item.repoUrl}
									<a
										href={item.repoUrl}
										target="_blank"
										rel="noopener noreferrer"
										class="font-mono-tech rounded-full border border-[var(--rule)] bg-[var(--bg-bone)] px-4 py-1.5 text-[11px] font-medium text-[var(--ink)] transition-colors hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--bg-plate)]"
									>
										Repository
									</a>
								{/if}
							</div>
						{/if}
					</article>
				{/each}
			</div>

			<div class="flex flex-col gap-5">
				<!-- Clean Minimal Honors Spotlight (zero smudges / watermarks) -->
				<div class="rounded-2xl border border-[var(--rule)] bg-[var(--bg-plate)] p-6">
					<div class="flex items-center justify-between border-b border-[var(--rule)] pb-3">
						<span class="font-mono-tech text-xs font-semibold text-[var(--ink)]">
							Honors
						</span>
						<span class="font-mono-tech text-xs font-semibold text-[var(--teal)] tabular-nums">
							0{activeHonorIndex + 1} / 0{HONOR_ITEMS.length}
						</span>
					</div>

					<div class="py-5">
						<div
							class="font-display text-5xl leading-none font-extrabold tracking-tight"
							class:text-[var(--vermilion)]={activeHonorIndex === 0}
							class:text-[var(--teal)]={activeHonorIndex !== 0}
						>
							{activeHonor.rank}
						</div>
						<div class="font-display mt-3 text-lg leading-snug font-bold text-[var(--ink)]">
							{activeHonor.title}
						</div>
						<div class="font-mono-tech mt-1.5 text-xs text-[var(--ink-muted)]">
							{activeHonor.organizer} / {activeHonor.date}
						</div>
					</div>

					<div class="grid grid-cols-1 gap-2 border-t border-[var(--rule)] pt-4 sm:grid-cols-2">
						{#each HONOR_ITEMS as honor, idx}
							<button
								type="button"
								onclick={() => (activeHonorIndex = idx)}
								onpointerenter={() => (activeHonorIndex = idx)}
								aria-pressed={activeHonorIndex === idx}
								class="rounded-xl border px-3.5 py-2.5 text-left transition-colors duration-200"
								class:border-[var(--ink)]={activeHonorIndex === idx}
								class:bg-[var(--bg-bone)]={activeHonorIndex === idx}
								class:border-[var(--rule)]={activeHonorIndex !== idx}
								class:bg-transparent={activeHonorIndex !== idx}
							>
								<div class="font-mono-tech text-[11px] font-semibold text-[var(--teal)]">
									0{idx + 1} / {honor.date}
								</div>
								<div class="mt-0.5 truncate text-xs font-semibold text-[var(--ink)]">
									{honor.organizer}
								</div>
							</button>
						{/each}
					</div>
				</div>

				<!-- Clean ASSETS UGM Card -->
				<article
					class="rounded-2xl border bg-[var(--bg-plate)] p-6 transition-colors duration-200"
					class:border-[var(--teal)]={activeRunIndex === 3}
					class:border-[var(--rule)]={activeRunIndex !== 3}
					onpointerenter={() => (activeRunIndex = 3)}
				>
					<div class="flex items-baseline justify-between gap-2">
						<h3 class="font-display text-base font-bold text-[var(--ink)]">
							{LEADERSHIP_ITEM.organization}
						</h3>
						<span class="font-mono-tech rounded-full bg-[var(--bg-bone)] px-3 py-0.5 text-[11px] font-medium text-[var(--teal)]">
							{LEADERSHIP_ITEM.period}
						</span>
					</div>
					<div class="mt-1 text-xs font-medium text-[var(--ink-muted)]">
						{LEADERSHIP_ITEM.role}
					</div>
					<ul class="mt-3 space-y-1.5 text-sm leading-relaxed text-[#2A2E35]">
						{#each LEADERSHIP_ITEM.highlights as item}
							<li>{item}</li>
						{/each}
					</ul>
				</article>
			</div>
		</div>
	</div>
</section>

<style>
	.exp-live-ping {
		animation: exp-live-pulse 2.2s ease-in-out infinite;
	}

	@keyframes exp-live-pulse {
		0%,
		100% {
			opacity: 0.85;
			transform: scale(1);
		}
		50% {
			opacity: 0.2;
			transform: scale(1.7);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.exp-live-ping {
			animation: none;
			opacity: 0;
		}
	}
</style>
