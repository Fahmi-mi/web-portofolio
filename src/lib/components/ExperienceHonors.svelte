<script lang="ts">
	import { onMount } from 'svelte';
	import { EXPERIENCE_ITEMS, HONOR_ITEMS, LEADERSHIP_ITEM } from '$lib/data/portfolio';

	let sectionEl = $state<HTMLElement | null>(null);
	let inView = $state(false);
	let activeRunIndex = $state(0);
	let activeHonorIndex = $state(0);
	let pointerX = $state(50);
	let pointerY = $state(50);
	let pointerActive = $state(false);
	let scanKey = $state(0);

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

	// 9 monthly columns (Feb -> Now); colStart/colSpan align strictly with verified 2026 periods.
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
			checkpoints: ['MySQL', 'JSON Cache']
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
	const watermarkText = 'PINGFEST UNS  RISTEK UI  DATA VIZ  DATATHON  '.repeat(28);

	function selectHonor(idx: number) {
		if (activeHonorIndex !== idx) {
			activeHonorIndex = idx;
			scanKey += 1;
		}
	}

	onMount(() => {
		const el = sectionEl;
		if (!el) return;

		const handlePointerMove = (e: PointerEvent) => {
			const rect = el.getBoundingClientRect();
			pointerX = ((e.clientX - rect.left) / Math.max(1, rect.width)) * 100;
			pointerY = ((e.clientY - rect.top) / Math.max(1, rect.height)) * 100;
			pointerActive = true;
		};
		const handlePointerLeave = () => {
			pointerActive = false;
		};

		el.addEventListener('pointermove', handlePointerMove, { passive: true });
		el.addEventListener('pointerleave', handlePointerLeave);

		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduced) {
			inView = true;
			return () => {
				el.removeEventListener('pointermove', handlePointerMove);
				el.removeEventListener('pointerleave', handlePointerLeave);
			};
		}

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((e) => e.isIntersecting)) {
					inView = true;
					scanKey += 1;
					observer.disconnect();
				}
			},
			{ threshold: 0.14 }
		);
		observer.observe(el);

		return () => {
			observer.disconnect();
			el.removeEventListener('pointermove', handlePointerMove);
			el.removeEventListener('pointerleave', handlePointerLeave);
		};
	});
</script>

<section
	id="experience"
	bind:this={sectionEl}
	class="relative isolate scroll-mt-16 overflow-hidden border-b border-[var(--rule)] bg-[var(--bg-plate)]"
>
	<!-- Cursor-illuminated precision grid backdrop -->
	<div
		aria-hidden="true"
		class="specimen-dot-grid pointer-events-none absolute inset-0 -z-10 transition-opacity duration-500"
		style:opacity={pointerActive ? 0.85 : 0}
		style:mask-image={`radial-gradient(320px circle at ${pointerX}% ${pointerY}%, #000, transparent 78%)`}
		style:-webkit-mask-image={`radial-gradient(320px circle at ${pointerX}% ${pointerY}%, #000, transparent 78%)`}
	></div>

	<div class="w-full px-6 py-20 sm:px-10 lg:px-14 lg:py-24 xl:px-20">
		<div class="flex flex-col justify-between gap-4 border-b border-[var(--ink)] pb-6 md:flex-row md:items-end">
			<div>
				<h2 class="font-display text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-4xl">
					Experience &amp; Honors
				</h2>
				<p class="mt-2 max-w-[65ch] text-base text-[var(--ink-muted)]">
					Production client deployments, technical mentorship at UGM, and competition placements.
				</p>
			</div>

			<div class="font-mono-tech flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-[var(--ink-muted)]">
				<span>4 runs</span>
				<span class="flex items-center gap-1.5 text-[var(--ink)]">
					<span class="relative grid h-2.5 w-2.5 place-items-center" aria-hidden="true">
						<span class="exp-live-ping absolute inset-0 bg-[var(--teal)]"></span>
						<span class="relative h-2 w-2 border border-[var(--ink)] bg-[var(--teal)]"></span>
					</span>
					1 active
				</span>
				<span>3 shipped</span>
				<span class="flex items-center gap-1.5">
					<span class="h-2 w-2 rotate-45 border border-[var(--ink)] bg-[var(--bg-plate)]" aria-hidden="true"></span>
					checkpoint
				</span>
			</div>
		</div>

		<!-- Run-Timeline Execution Matrix (desktop interactive gantt rail) -->
		<div class="mt-8 hidden overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--bg-bone)] md:block">
			<div class="grid min-w-[780px] grid-cols-[15rem_minmax(0,1fr)]">
				<div class="flex h-10 items-center border-r border-b border-[var(--rule)] bg-[var(--bg-plate)] px-4 font-mono-tech text-[10.5px] font-semibold tracking-[0.06em] text-[var(--ink-muted)] uppercase">
					Execution Run (2026)
				</div>
				<div class="grid h-10 grid-cols-9 border-b border-[var(--rule)] bg-[var(--bg-plate)]">
					{#each MONTHS as month}
						<div class="flex items-center border-l border-[var(--rule)]/70 px-3 font-mono-tech text-[10.5px] text-[var(--ink-muted)] first:border-l-0">
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
						class="flex items-center justify-between border-r border-b border-[var(--rule)] px-4 py-3 text-left transition-colors last:border-b-0"
						class:bg-[var(--bg-plate)]={activeRunIndex === idx}
						class:font-semibold={activeRunIndex === idx}
					>
						<span class="font-mono-tech truncate text-xs text-[var(--ink)]">{run.label}</span>
						<span
							class="ml-2 h-2 w-2 shrink-0"
							class:bg-[var(--teal)]={run.status === 'running' || activeRunIndex === idx}
							class:bg-[var(--rule)]={run.status !== 'running' && activeRunIndex !== idx}
						></span>
					</button>

					<div class="relative grid grid-cols-9 items-center border-b border-[var(--rule)] py-2.5 last:border-b-0">
						{#each MONTHS as _}
							<div class="pointer-events-none h-full border-l border-[var(--rule)]/40 first:border-l-0"></div>
						{/each}
						<div
							class="pointer-events-none absolute inset-y-0 right-0 left-0 grid grid-cols-9 items-center px-1.5"
						>
							<div
								style={`grid-column: ${run.colStart} / span ${run.colSpan};`}
								class="relative flex h-6 items-center justify-between rounded-full border px-2.5 font-mono-tech text-[10px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
								class:border-[var(--teal)]={activeRunIndex === idx || run.status === 'running'}
								class:bg-[var(--teal)]={run.status === 'running'}
								class:text-[var(--bg-plate)]={run.status === 'running'}
								class:bg-[var(--bg-plate)]={run.status !== 'running'}
								class:text-[var(--ink)]={run.status !== 'running'}
								class:border-[var(--rule)]={activeRunIndex !== idx && run.status !== 'running'}
							>
								<span class="truncate">{run.checkpoints.join(' / ')}</span>
								{#if run.status === 'running'}
									<span class="relative ml-2 h-2 w-2 shrink-0 bg-[var(--bg-plate)]" aria-hidden="true"></span>
								{:else}
									<span
										aria-hidden="true"
										class="ml-2 h-2 w-2 shrink-0 rotate-45 border border-[var(--ink)]"
										class:bg-[var(--teal)]={activeRunIndex === idx}
										class:bg-[var(--bg-plate)]={activeRunIndex !== idx}
									></span>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Lower Split: Experience Entries (Left) + Monumental Honors Stage & ASSETS UGM (Right) -->
		<div class="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_0.85fr]">
			<div class="divide-y divide-[var(--rule)] border-t border-b border-[var(--rule)]">
				{#each EXPERIENCE_ITEMS as item, idx}
					<article
						class="border-l-2 py-6 pl-5 transition-colors duration-200 first:pt-5 last:pb-5"
						class:border-[var(--teal)]={activeRunIndex === idx}
						class:border-transparent={activeRunIndex !== idx}
						onpointerenter={() => (activeRunIndex = idx)}
					>
						<div class="flex flex-wrap items-baseline justify-between gap-2">
							<h3 class="font-display text-xl font-bold text-[var(--ink)]">
								{item.organization}
							</h3>
							<span class="font-mono-tech text-xs text-[var(--teal)]">{item.period}</span>
						</div>
						<div class="font-mono-tech mt-1 text-xs text-[var(--ink-muted)]">
							{item.role} | {item.location}
						</div>

						<ul class="mt-3.5 space-y-2 text-sm leading-relaxed text-[#2A2E35]">
							{#each item.highlights as point}
								<li class="border-l border-[var(--rule)] pl-3">{point}</li>
							{/each}
						</ul>

						{#if item.liveUrl || item.repoUrl}
							<div class="mt-4 flex items-center gap-4">
								{#if item.liveUrl}
									<a
										href={item.liveUrl}
										target="_blank"
										rel="noopener noreferrer"
										class="font-mono-tech border-b border-[var(--vermilion)] pb-0.5 text-xs font-semibold text-[var(--vermilion)] uppercase"
									>
										Live Site
									</a>
								{/if}
								{#if item.repoUrl}
									<a
										href={item.repoUrl}
										target="_blank"
										rel="noopener noreferrer"
										class="font-mono-tech border-b border-[var(--ink)] pb-0.5 text-xs font-semibold text-[var(--ink)] uppercase hover:border-[var(--teal)] hover:text-[var(--teal)]"
									>
										Repository
									</a>
								{/if}
							</div>
						{/if}
					</article>
				{/each}
			</div>

			<div class="flex flex-col gap-6">
				<!-- Poster-Wall Honors Stage inspired by typographic scanner specimens -->
				<div class="relative overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--bg-bone)] p-6">
					<!-- Repeating subtle typographic watermark mask -->
					<div
						aria-hidden="true"
						class="pointer-events-none absolute -inset-4 font-mono-tech text-[8px] leading-[11px] tracking-[0.14em] break-all text-[var(--ink)]/[0.045] select-none"
						style="mask-image: radial-gradient(110% 90% at 72% 45%, black 25%, transparent 82%); -webkit-mask-image: radial-gradient(110% 90% at 72% 45%, black 25%, transparent 82%);"
					>
						{watermarkText}
					</div>

					<!-- Calibrated horizontal scanner sweep on entrance / switch -->
					{#key scanKey}
						<span
							aria-hidden="true"
							class="honors-scan-line pointer-events-none absolute inset-y-0 left-0 w-[2px] bg-[var(--teal)]"
							class:is-scanning={inView}
						></span>
					{/key}

					<div class="relative flex items-center justify-between border-b border-[var(--rule)] pb-3">
						<span class="font-mono-tech text-xs font-semibold tracking-[0.05em] text-[var(--ink)] uppercase">
							Honors
						</span>
						<span class="font-mono-tech text-xs font-semibold text-[var(--teal)] tabular-nums">
							0{activeHonorIndex + 1} / 0{HONOR_ITEMS.length}
						</span>
					</div>

					<div class="relative py-6">
						<div
							class="font-display text-5xl leading-[0.88] font-extrabold tracking-[-0.04em] text-[var(--ink)] sm:text-6xl"
						>
							{activeHonor.rank}
						</div>
						<div class="font-display mt-3 text-lg leading-snug font-bold text-[var(--ink)]">
							{activeHonor.title}
						</div>
						<div class="font-mono-tech mt-1.5 text-xs text-[var(--teal)]">
							{activeHonor.organizer} | {activeHonor.date}
						</div>
					</div>

					<div class="relative grid grid-cols-1 gap-2 border-t border-[var(--rule)] pt-4 sm:grid-cols-2">
						{#each HONOR_ITEMS as honor, idx}
							<button
								type="button"
								onclick={() => selectHonor(idx)}
								onpointerenter={() => selectHonor(idx)}
								aria-pressed={activeHonorIndex === idx}
								class="rounded-xl border px-3 py-2.5 text-left transition-colors duration-200"
								class:border-[var(--ink)]={activeHonorIndex === idx}
								class:bg-[var(--bg-plate)]={activeHonorIndex === idx}
								class:border-[var(--rule)]={activeHonorIndex !== idx}
								class:bg-transparent={activeHonorIndex !== idx}
							>
								<div class="font-mono-tech text-[11px] font-semibold text-[var(--teal)] uppercase">
									0{idx + 1} | {honor.date}
								</div>
								<div class="mt-0.5 truncate text-xs font-semibold text-[var(--ink)]">
									{honor.organizer}
								</div>
							</button>
						{/each}
					</div>
				</div>

				<!-- Leadership / Mentorship Run Card -->
				<article
					class="rounded-2xl border bg-[var(--bg-bone)] p-6 transition-colors duration-200"
					class:border-[var(--teal)]={activeRunIndex === 3}
					class:border-[var(--rule)]={activeRunIndex !== 3}
					onpointerenter={() => (activeRunIndex = 3)}
				>
					<div class="flex items-baseline justify-between gap-2">
						<h3 class="font-display text-base font-bold text-[var(--ink)]">
							{LEADERSHIP_ITEM.organization}
						</h3>
						<span class="font-mono-tech text-xs text-[var(--teal)]">
							{LEADERSHIP_ITEM.period}
						</span>
					</div>
					<div class="font-mono-tech mt-1 text-xs text-[var(--ink-muted)]">
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
		animation: exp-live-pulse 2s ease-in-out infinite;
	}

	.honors-scan-line {
		opacity: 0;
		transform: translateX(0);
	}

	.honors-scan-line.is-scanning {
		animation: honors-sweep 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
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

	@keyframes honors-sweep {
		0% {
			opacity: 0.9;
			left: 0%;
		}
		75% {
			opacity: 0.75;
			left: 98%;
		}
		100% {
			opacity: 0;
			left: 100%;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.exp-live-ping,
		.honors-scan-line.is-scanning {
			animation: none;
			opacity: 0;
		}
	}
</style>
