<script lang="ts">
	import { onMount } from 'svelte';
	import { EXPERIENCE_ITEMS, HONOR_ITEMS, LEADERSHIP_ITEM } from '$lib/data/portfolio';

	let sectionEl = $state<HTMLElement | null>(null);
	let inView = $state(false);
	let activeExpIndex = $state(0);
	let activeHonorIndex = $state(0);

	onMount(() => {
		if (!sectionEl) return;
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduced) {
			inView = true;
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((e) => e.isIntersecting)) {
					inView = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.15 }
		);
		observer.observe(sectionEl);

		return () => observer.disconnect();
	});

	const honorNodes = [
		{ x: 255, y: 38, color: '#B8381E', shortLabel: 'Oct 2025: UNS Data Viz (3rd)' },
		{ x: 132, y: 68, color: '#0F766E', shortLabel: 'Sep 2025: UI Datathon (Top 3)' }
	];
	const activeHonorNode = $derived(honorNodes[activeHonorIndex] ?? honorNodes[0]);
</script>

<section
	id="experience"
	bind:this={sectionEl}
	class="scroll-mt-16 border-b border-[var(--rule)] bg-[var(--bg-plate)]"
>
	<div class="w-full px-6 py-20 sm:px-10 lg:px-14 lg:py-24 xl:px-20">
		<div class="border-b border-[var(--ink)] pb-6">
			<h2 class="font-display text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-4xl">
				Experience &amp; National Honors
			</h2>
			<p class="mt-2 max-w-[65ch] text-base text-[var(--ink-muted)]">
				Production client deployments, national data science podiums, and technical mentorship at UGM.
			</p>
		</div>

		<div class="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1.18fr_0.82fr]">
			<!-- Left: Animated vertical timeline spine + interactive hover focus -->
			<div class="relative pl-6 sm:pl-8">
				<div class="absolute top-2 bottom-2 left-2 w-[2px] bg-[var(--rule)] sm:left-2.5" aria-hidden="true">
					<div
						class="h-full w-full origin-top bg-[var(--teal)] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
						style:transform={inView ? 'scaleY(1)' : 'scaleY(0)'}
					></div>
				</div>

				<div class="divide-y divide-[var(--rule)] border-t border-b border-[var(--rule)]">
					{#each EXPERIENCE_ITEMS as item, idx}
						<article
							class="relative py-6 transition-colors duration-300 first:pt-5 last:pb-5"
							onpointerenter={() => (activeExpIndex = idx)}
						>
							<!-- Timeline Node Marker on Spine -->
							<span
								aria-hidden="true"
								class="absolute top-7 -left-6 flex h-3.5 w-3.5 items-center justify-center border transition-all duration-300 sm:-left-8"
								class:border-[var(--teal)]={activeExpIndex === idx}
								class:bg-[var(--teal)]={activeExpIndex === idx}
								class:scale-110={activeExpIndex === idx}
								class:border-[var(--ink)]={activeExpIndex !== idx}
								class:bg-[var(--bg-plate)]={activeExpIndex !== idx}
							>
								{#if activeExpIndex === idx}
									<span class="exp-node-ping absolute -inset-1.5 border border-[var(--teal)]"></span>
								{/if}
							</span>

							<div class="flex flex-wrap items-baseline justify-between gap-2">
								<h3 class="font-display text-xl font-bold text-[var(--ink)] transition-colors duration-200">
									{item.organization}
								</h3>
								<span class="font-mono-tech text-xs text-[var(--teal)]">{item.period}</span>
							</div>
							<div class="font-mono-tech mt-1 text-xs text-[var(--ink-muted)]">
								{item.role} | {item.location}
							</div>

							<ul class="mt-3.5 space-y-2 text-sm leading-relaxed text-[#2A2E35]">
								{#each item.highlights as point}
									<li
										class="border-l pl-3 transition-colors duration-300"
										class:border-[var(--teal)]={activeExpIndex === idx}
										class:border-[var(--rule)]={activeExpIndex !== idx}
									>
										{point}
									</li>
								{/each}
							</ul>

							<div class="mt-4 flex flex-wrap items-center justify-between gap-3">
								<div class="font-mono-tech text-[11px] text-[var(--ink-muted)]">
									{item.stack.join(' / ')}
								</div>

								{#if item.liveUrl || item.repoUrl}
									<div class="flex items-center gap-4">
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
							</div>
						</article>
					{/each}
				</div>
			</div>

			<!-- Right: Animated Achievement Trajectory + UGM Mentorship -->
			<div class="flex flex-col gap-6">
				<div class="border border-[var(--rule)] bg-[var(--bg-bone)] p-6">
					<div class="flex items-center justify-between border-b border-[var(--rule)] pb-3">
						<span class="font-mono-tech text-xs font-semibold tracking-[0.05em] text-[var(--ink)] uppercase">
							National Competitions
						</span>
						<span class="font-mono-tech text-xs font-semibold text-[var(--teal)]">2x National Top 3</span>
					</div>

					<svg
						viewBox="0 0 360 116"
						class="mt-4 h-auto w-full border border-[var(--rule)] bg-[var(--bg-plate)] p-2"
						role="img"
						aria-label="National competition trajectory from Sep 2025 UI Datathon to Oct 2025 UNS Data Visualization"
					>
						<line x1="20" y1="92" x2="340" y2="92" stroke="#D8D4CA" stroke-width="1" />
						<line x1="132" y1="22" x2="132" y2="92" stroke="#E5E1D8" stroke-dasharray="3 3" stroke-width="1" />
						<line x1="255" y1="22" x2="255" y2="92" stroke="#E5E1D8" stroke-dasharray="3 3" stroke-width="1" />

						<!-- Shaded uplift trajectory band -->
						<path
							d="M 24 88 C 78 82, 102 72, 132 68 C 185 58, 215 44, 255 38 C 292 34, 318 30, 336 28 L 336 92 L 24 92 Z"
							fill="#0F766E"
							fill-opacity={inView ? '0.09' : '0'}
							class="transition-opacity duration-700"
						/>

						<!-- Animated sweep trajectory curve -->
						<path
							d="M 24 88 C 78 82, 102 72, 132 68 C 185 58, 215 44, 255 38 C 292 34, 318 30, 336 28"
							fill="none"
							stroke="#0F766E"
							stroke-width="2.4"
							class="exp-trajectory"
							class:is-drawn={inView}
						/>

						<!-- Active callout radar ring -->
						<circle
							cx={activeHonorNode.x}
							cy={activeHonorNode.y}
							r="13"
							fill="none"
							stroke={activeHonorNode.color}
							stroke-width="1.2"
							class="exp-pulse-ring"
						/>

						<!-- Milestone 1: Sep 2025 UI Datathon -->
						<circle
							cx="132"
							cy="68"
							r={activeHonorIndex === 1 ? 6.5 : 5}
							fill="#0F766E"
							stroke="#FAF9F5"
							stroke-width="1.8"
						/>
						<!-- Milestone 2: Oct 2025 UNS Data Viz -->
						<circle
							cx="255"
							cy="38"
							r={activeHonorIndex === 0 ? 6.5 : 5}
							fill="#B8381E"
							stroke="#FAF9F5"
							stroke-width="1.8"
						/>

						<text x="132" y="106" text-anchor="middle" font-family="JetBrains Mono" font-size="9" fill="#4B525A">
							SEP 2025
						</text>
						<text x="255" y="106" text-anchor="middle" font-family="JetBrains Mono" font-size="9" fill="#4B525A">
							OCT 2025
						</text>
						<text x="24" y="22" font-family="JetBrains Mono" font-size="9.5" font-weight="600" fill={activeHonorNode.color}>
							{activeHonorNode.shortLabel}
						</text>
					</svg>

					<div class="mt-4 space-y-2.5">
						{#each HONOR_ITEMS as honor, idx}
							<button
								type="button"
								onclick={() => (activeHonorIndex = idx)}
								onpointerenter={() => (activeHonorIndex = idx)}
								aria-pressed={activeHonorIndex === idx}
								class="block w-full border px-3.5 py-3 text-left transition-colors duration-200"
								class:border-[var(--ink)]={activeHonorIndex === idx}
								class:bg-[var(--bg-plate)]={activeHonorIndex === idx}
								class:border-[var(--rule)]={activeHonorIndex !== idx}
								class:bg-transparent={activeHonorIndex !== idx}
							>
								<div class="font-display text-sm font-bold text-[var(--ink)]">
									{honor.title}
								</div>
								<div class="font-mono-tech mt-0.5 text-xs text-[var(--ink-muted)]">
									{honor.organizer} | {honor.date}
								</div>
							</button>
						{/each}
					</div>
				</div>

				<div class="border border-[var(--rule)] bg-[var(--bg-bone)] p-6">
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
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.exp-trajectory {
		stroke-dasharray: 420;
		stroke-dashoffset: 420;
		transition: stroke-dashoffset 1.15s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.exp-trajectory.is-drawn {
		stroke-dashoffset: 0;
	}

	.exp-pulse-ring {
		transform-box: fill-box;
		transform-origin: center;
		animation: exp-ring-breathe 2.4s ease-in-out infinite;
	}

	.exp-node-ping {
		animation: exp-ring-breathe 2.2s ease-in-out infinite;
	}

	@keyframes exp-ring-breathe {
		0%,
		100% {
			opacity: 0.9;
			transform: scale(0.95);
		}
		50% {
			opacity: 0.25;
			transform: scale(1.18);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.exp-trajectory {
			stroke-dashoffset: 0;
			transition: none;
		}
		.exp-pulse-ring,
		.exp-node-ping {
			animation: none;
			opacity: 0.6;
		}
	}
</style>
