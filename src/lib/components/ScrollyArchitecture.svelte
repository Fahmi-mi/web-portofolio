<script lang="ts">
	import { onMount } from 'svelte';
	import { SCROLL_STAGES } from '$lib/data/portfolio';
	import { clampScrollStage, updateCardSpotlight } from '$lib/utils/interactions';

	interface Props {
		externalStage?: { index: number; seq: number } | null;
	}

	let { externalStage = null }: Props = $props();

	let activeIndex = $state(0);
	let scrollProgress = $state(0);
	let sectionEl = $state<HTMLElement | null>(null);
	let stickyEl = $state<HTMLDivElement | null>(null);
	let stepEls: HTMLElement[] = [];

	const activeStage = $derived(SCROLL_STAGES[clampScrollStage(activeIndex, SCROLL_STAGES.length)]);

	function jumpToStage(idx: number) {
		const clamped = clampScrollStage(idx, SCROLL_STAGES.length);
		activeIndex = clamped;
		if (!sectionEl) return;
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const behavior: ScrollBehavior = reduced ? 'auto' : 'smooth';

		if (window.innerWidth >= 1024 && stickyEl) {
			const rect = sectionEl.getBoundingClientRect();
			const sectionTop = rect.top + window.scrollY;
			const span = Math.max(1, sectionEl.offsetHeight - stickyEl.offsetHeight);
			const targetProgress = clamped === 0 ? 0.08 : clamped === 1 ? 0.5 : 0.9;
			window.scrollTo({ top: Math.round(sectionTop - 80 + span * targetProgress), behavior });
			return;
		}

		stepEls[clamped]?.scrollIntoView({ behavior, block: 'center' });
	}

	$effect(() => {
		if (!externalStage) return;
		jumpToStage(externalStage.index);
	});

	onMount(() => {
		let rafPending = false;
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const updateScrollProgress = () => {
			rafPending = false;
			if (!sectionEl) return;
			const rect = sectionEl.getBoundingClientRect();
			const viewH = window.innerHeight || 800;

			if (window.innerWidth >= 1024 && stickyEl) {
				const scrollableSpan = Math.max(1, sectionEl.offsetHeight - stickyEl.offsetHeight);
				const traveled = 80 - rect.top;
				const progress = Math.min(1, Math.max(0, traveled / scrollableSpan));
				scrollProgress = progress;
				const nextIdx = progress < 0.34 ? 0 : progress < 0.68 ? 1 : 2;
				activeIndex = clampScrollStage(nextIdx, SCROLL_STAGES.length);
				return;
			}

			const totalSpan = Math.max(1, rect.height - viewH * 0.45);
			const traveled = viewH * 0.35 - rect.top;
			scrollProgress = Math.min(1, Math.max(0, traveled / totalSpan));

			const focalY = viewH * 0.42;
			let closestIdx = 0;
			let closestDist = Infinity;
			for (let i = 0; i < stepEls.length; i++) {
				const el = stepEls[i];
				if (!el) continue;
				const r = el.getBoundingClientRect();
				const center = r.top + r.height * 0.5;
				const dist = Math.abs(center - focalY);
				if (dist < closestDist) {
					closestDist = dist;
					closestIdx = i;
				}
			}
			activeIndex = clampScrollStage(closestIdx, SCROLL_STAGES.length);
		};

		const onScroll = () => {
			if (reduced) {
				updateScrollProgress();
				return;
			}
			if (!rafPending) {
				rafPending = true;
				window.requestAnimationFrame(updateScrollProgress);
			}
		};

		updateScrollProgress();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		};
	});
</script>

<!-- Pinned bounded desktop runway prolongs scrollytelling dwell while keeping step spacing compact and even -->
<section
	id="about"
	bind:this={sectionEl}
	class="relative scroll-mt-20 bg-gradient-to-b from-[var(--bg-bone)] via-[#f2f3ef] to-[var(--bg-bone)] lg:min-h-[clamp(1350px,195vh,1850px)]"
>
	<div bind:this={stickyEl} class="w-full px-6 py-16 sm:px-10 lg:sticky lg:top-20 lg:px-14 lg:py-12 xl:px-20">
		<div class="max-w-[66ch]">
			<h2 class="font-display text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-4xl">
				What I Build &amp; Solve
			</h2>
			<p class="mt-2.5 text-base leading-relaxed text-[var(--ink-muted)]">
				Turning fragmented workflows, noisy data, and manual checks into structured systems that make work reliable and fast.
			</p>
		</div>

		<div class="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12">
			<!-- Evenly spaced borderless steps without stage/stack headers -->
			<div class="space-y-4">
				{#each SCROLL_STAGES as stage, idx (stage.id)}
					<button
						type="button"
						bind:this={stepEls[idx]}
						data-stage-index={idx}
						onclick={() => jumpToStage(idx)}
						onpointermove={updateCardSpotlight}
						aria-pressed={activeIndex === idx}
						class="clean-spotlight-card block w-full rounded-2xl p-5 text-left transition-all duration-300 sm:p-6"
						class:liquid-glass-light={activeIndex === idx}
						class:opacity-100={activeIndex === idx}
						class:bg-transparent={activeIndex !== idx}
						class:opacity-65={activeIndex !== idx}
						class:hover:opacity-100={activeIndex !== idx}
					>
						<h3 class="font-display text-lg font-bold text-[var(--ink)] sm:text-xl">
							{stage.title}
						</h3>
						<p class="mt-2 text-sm leading-relaxed text-[#2A2E35] sm:text-base">
							{stage.description}
						</p>

						<div class="mt-3 font-mono-tech text-xs font-medium text-[var(--ink)]">
							<span class="text-[var(--ink-muted)]">{stage.metricLabel}:</span>
							{stage.metricValue}
						</div>
					</button>
				{/each}
			</div>

			<!-- Dark smoked Liquid Glass showcase without stage pill -->
			<div class="relative">
				<div
					class="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] opacity-75 blur-2xl"
					style="background: radial-gradient(circle at 24% 28%, rgba(15, 118, 110, 0.28), transparent 55%), radial-gradient(circle at 82% 78%, rgba(184, 56, 30, 0.18), transparent 55%);"
					aria-hidden="true"
				></div>

				<div class="liquid-glass-dark rounded-3xl p-6 text-[var(--vitrine-ink)] sm:p-8">
					<div class="font-mono-tech text-xs font-semibold text-white">
						{activeStage.title}
					</div>

					<div class="mt-3 h-[2px] w-full overflow-hidden rounded-full bg-slate-700/60">
						<div
							class="h-full origin-left rounded-full bg-[var(--vitrine-ok)] transition-transform duration-150 ease-out"
							style:transform={`scaleX(${Math.max(0.08, scrollProgress)})`}
						></div>
					</div>

					<div class="my-5 overflow-hidden">
						{#key activeIndex}
							<div class="panel-swap-enter">
								{#if activeIndex === 0}
									<svg viewBox="0 0 560 300" class="h-auto w-full" role="img" aria-label="Comparing raw heuristic errors with calibrated conformal and causal profit curves">
										<line x1="44" y1="254" x2="524" y2="254" stroke="#475569" stroke-width="1.2" />
										<line x1="44" y1="28" x2="44" y2="254" stroke="#475569" stroke-width="1.2" />
										<path
											d="M 44 246 C 175 212, 290 135, 514 66 L 514 38 C 320 88, 185 170, 44 218 Z"
											fill="#7FD4C2"
											fill-opacity="0.14"
										/>
										<path
											d="M 44 254 C 165 128, 315 68, 514 48"
											fill="none"
											stroke="#7FD4C2"
											stroke-width="2.8"
											stroke-linecap="round"
											class="scrolly-curve"
										/>
										<path
											d="M 44 254 C 175 178, 320 132, 514 124"
											fill="none"
											stroke="#E8A394"
											stroke-width="2"
											stroke-linecap="round"
											class="scrolly-curve"
										/>
										<circle cx="514" cy="48" r="5.5" fill="#7FD4C2" />
										<circle cx="514" cy="124" r="5" fill="#E8A394" />
										<text x="56" y="42" font-family="JetBrains Mono" font-size="10.5" font-weight="600" fill="#F1F5F9">
											Conformal: 13.52% down to 1.96% FAR
										</text>
										<text x="514" y="30" text-anchor="end" font-family="JetBrains Mono" font-size="10.5" font-weight="600" fill="#7FD4C2">
											DR-Learner: $2,679.37 | 96.14% Quality
										</text>
										<text x="514" y="146" text-anchor="end" font-family="JetBrains Mono" font-size="10" fill="#E8A394">
											Naive Propensity: $1,529.02
										</text>
									</svg>
								{:else if activeIndex === 1}
									<svg viewBox="0 0 560 300" class="h-auto w-full" role="img" aria-label="Transforming fragmented manual operations into structured full-stack platforms">
										<text x="128" y="24" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" font-weight="600" fill="#E8A394">
											Fragmented Problem
										</text>
										<text x="418" y="24" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" font-weight="600" fill="#7FD4C2">
											Structured System
										</text>

										<rect x="12" y="44" width="232" height="66" rx="12" fill="rgba(38,46,56,0.75)" />
										<text x="128" y="72" text-anchor="middle" font-family="JetBrains Mono" font-size="10.5" font-weight="600" fill="#F1F5F9">
											Manual Grading &amp; KPI Sheets
										</text>
										<text x="128" y="91" text-anchor="middle" font-family="JetBrains Mono" font-size="9.2" fill="#A3AEBC">
											Slow exam sync &amp; scattered reports
										</text>

										<rect x="12" y="126" width="232" height="66" rx="12" fill="rgba(38,46,56,0.75)" />
										<text x="128" y="154" text-anchor="middle" font-family="JetBrains Mono" font-size="10.5" font-weight="600" fill="#F1F5F9">
											Unstructured Tour &amp; CMS Edits
										</text>
										<text x="128" y="173" text-anchor="middle" font-family="JetBrains Mono" font-size="9.2" fill="#A3AEBC">
											Manual inquiries &amp; static pages
										</text>

										<rect x="12" y="208" width="232" height="68" rx="12" fill="rgba(38,46,56,0.75)" />
										<text x="128" y="236" text-anchor="middle" font-family="JetBrains Mono" font-size="10.5" font-weight="600" fill="#F1F5F9">
											Clinic Records Without Docs
										</text>
										<text x="128" y="255" text-anchor="middle" font-family="JetBrains Mono" font-size="9.2" fill="#A3AEBC">
											Ad-hoc endpoints without contract specs
										</text>

										<line x1="248" y1="77" x2="294" y2="77" stroke="#7FD4C2" stroke-width="1.5" stroke-dasharray="4 3" />
										<line x1="248" y1="159" x2="294" y2="159" stroke="#7FD4C2" stroke-width="1.5" stroke-dasharray="4 3" />
										<line x1="248" y1="242" x2="294" y2="242" stroke="#7FD4C2" stroke-width="1.5" stroke-dasharray="4 3" />

										<rect x="298" y="44" width="250" height="66" rx="12" fill="rgba(38,46,56,0.82)" stroke="#7FD4C2" stroke-width="1" stroke-opacity="0.45" />
										<text x="423" y="72" text-anchor="middle" font-family="JetBrains Mono" font-size="10.5" font-weight="600" fill="#FFFFFF">
											Smart School Platform
										</text>
										<text x="423" y="91" text-anchor="middle" font-family="JetBrains Mono" font-size="9.2" fill="#7FD4C2">
											Laravel Queues | LLM | DashboardService
										</text>

										<rect x="298" y="126" width="250" height="66" rx="12" fill="rgba(38,46,56,0.82)" stroke="#7FD4C2" stroke-width="1" stroke-opacity="0.45" />
										<text x="423" y="154" text-anchor="middle" font-family="JetBrains Mono" font-size="10.5" font-weight="600" fill="#FFFFFF">
											Localive &amp; Jogja Tour
										</text>
										<text x="423" y="173" text-anchor="middle" font-family="JetBrains Mono" font-size="9.2" fill="#7FD4C2">
											Bilingual RBAC CMS | JSON Failover
										</text>

										<rect x="298" y="208" width="250" height="68" rx="12" fill="rgba(38,46,56,0.82)" stroke="#7FD4C2" stroke-width="1" stroke-opacity="0.45" />
										<text x="423" y="236" text-anchor="middle" font-family="JetBrains Mono" font-size="10.5" font-weight="600" fill="#FFFFFF">
											Tentang Dental Backend
										</text>
										<text x="423" y="255" text-anchor="middle" font-family="JetBrains Mono" font-size="9.2" fill="#7FD4C2">
											Laravel REST API + OpenAPI Scramble
										</text>
									</svg>
								{:else}
									<svg viewBox="0 0 560 300" class="h-auto w-full" role="img" aria-label="Automating real-time anomaly monitoring and repetitive developer workflows">
										<text x="280" y="24" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" font-weight="600" fill="#A3AEBC">
											Event Ingestion  /  Autonomous Reasoning  /  Keyboard Workflows
										</text>

										<line x1="164" y1="92" x2="208" y2="92" stroke="#7FD4C2" stroke-width="1.6" stroke-dasharray="5 4" />
										<line x1="352" y1="92" x2="396" y2="92" stroke="#E8A394" stroke-width="1.6" stroke-dasharray="5 4" />
										<path d="M 280 190 L 280 134" fill="none" stroke="#94A3B8" stroke-width="1.4" stroke-dasharray="4 4" />
										<path d="M 470 190 L 470 134" fill="none" stroke="#7FD4C2" stroke-width="1.4" stroke-dasharray="4 4" />

										<rect x="16" y="50" width="148" height="84" rx="12" fill="rgba(38,46,56,0.82)" />
										<text x="90" y="79" text-anchor="middle" font-family="JetBrains Mono" font-size="11.5" font-weight="600" fill="#FFFFFF">
											NATS / Go
										</text>
										<text x="90" y="98" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" fill="#A3AEBC">
											Stream Triggers
										</text>
										<text x="90" y="118" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" font-weight="600" fill="#7FD4C2">
											&gt;3% | &gt;5x Vol
										</text>

										<rect x="206" y="50" width="148" height="84" rx="12" fill="rgba(38,46,56,0.82)" />
										<text x="280" y="79" text-anchor="middle" font-family="JetBrains Mono" font-size="11.5" font-weight="600" fill="#FFFFFF">
											LangGraph
										</text>
										<text x="280" y="98" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" fill="#A3AEBC">
											5-Stage Worker
										</text>
										<text x="280" y="118" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" font-weight="600" fill="#E8A394">
											Auto Alerting
										</text>

										<rect x="396" y="50" width="148" height="84" rx="12" fill="rgba(38,46,56,0.82)" />
										<text x="470" y="79" text-anchor="middle" font-family="JetBrains Mono" font-size="11.5" font-weight="600" fill="#FFFFFF">
											TimescaleDB
										</text>
										<text x="470" y="98" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" fill="#A3AEBC">
											4 Airflow DAGs
										</text>
										<text x="470" y="118" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" font-weight="600" fill="#7FD4C2">
											Feature Store
										</text>

										<rect x="16" y="190" width="528" height="88" rx="14" fill="rgba(38,46,56,0.82)" />
										<text x="280" y="220" text-anchor="middle" font-family="JetBrains Mono" font-size="11" font-weight="600" fill="#FFFFFF">
											Glzr Workspace  /  Trello CLI  /  End-to-End MLflow Pipeline
										</text>
										<text x="280" y="242" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" fill="#7FD4C2">
											Terminal-first speed &amp; reproducible Parquet training runs
										</text>
										<text x="280" y="264" text-anchor="middle" font-family="JetBrains Mono" font-size="9.2" fill="#A3AEBC">
											Replacing manual context-switching with automated pipelines
										</text>
									</svg>
								{/if}
							</div>
						{/key}
					</div>

					<div class="font-mono-tech text-xs text-[var(--vitrine-muted)]">
						{activeStage.metricLabel}: <span class="text-slate-200">{activeStage.metricValue}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes draw-stage-curve {
		from {
			stroke-dashoffset: 900;
		}
		to {
			stroke-dashoffset: 0;
		}
	}

	.scrolly-curve {
		stroke-dasharray: 900;
		stroke-dashoffset: 0;
		animation: draw-stage-curve 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	@media (prefers-reduced-motion: reduce) {
		.scrolly-curve {
			animation: none;
			stroke-dashoffset: 0;
		}
	}
</style>
