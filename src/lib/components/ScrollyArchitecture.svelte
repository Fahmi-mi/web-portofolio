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
	let stepEls: HTMLElement[] = [];

	const activeStage = $derived(SCROLL_STAGES[clampScrollStage(activeIndex, SCROLL_STAGES.length)]);

	function jumpToStage(idx: number) {
		activeIndex = clampScrollStage(idx, SCROLL_STAGES.length);
		const target = stepEls[idx];
		if (!target) return;
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
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

<section id="about" bind:this={sectionEl} class="scroll-mt-16 border-b border-[var(--rule)] bg-[var(--bg-bone)]">
	<div class="w-full px-6 py-20 sm:px-10 lg:px-14 lg:py-24 xl:px-20">
		<div class="flex flex-col justify-between gap-6 border-b border-[var(--rule)] pb-7 md:flex-row md:items-end">
			<div>
				<h2 class="font-display text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-4xl">
					What I Build &amp; Solve
				</h2>
				<p class="mt-3 max-w-[68ch] text-base leading-relaxed text-[var(--ink-muted)]">
					How I turn fragmented workflows, noisy data, and manual checks into structured systems that make work reliable and fast.
				</p>
			</div>
			<div class="flex flex-wrap gap-2" role="group" aria-label="Jump to capability pillar">
				{#each SCROLL_STAGES as stage, idx}
					<button
						type="button"
						aria-pressed={activeIndex === idx}
						onclick={() => jumpToStage(idx)}
						class="font-mono-tech rounded-full border px-4 py-1.5 text-xs font-medium transition-colors duration-300"
						class:border-[var(--ink)]={activeIndex === idx}
						class:bg-[var(--ink)]={activeIndex === idx}
						class:text-[var(--bg-plate)]={activeIndex === idx}
						class:border-[var(--rule)]={activeIndex !== idx}
						class:bg-[var(--bg-plate)]={activeIndex !== idx}
						class:text-[var(--ink-muted)]={activeIndex !== idx}
					>
						{stage.step}
					</button>
				{/each}
			</div>
		</div>

		<div class="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
			<div class="space-y-8 lg:space-y-44 lg:pt-6 lg:pb-16">
				{#each SCROLL_STAGES as stage, idx (stage.id)}
					<article
						bind:this={stepEls[idx]}
						data-stage-index={idx}
						onpointermove={updateCardSpotlight}
						class="clean-spotlight-card rounded-2xl border p-6 sm:p-7"
						class:border-[var(--teal)]={activeIndex === idx}
						class:bg-[var(--bg-plate)]={activeIndex === idx}
						class:shadow-[0_14px_34px_-20px_rgba(15,118,110,0.22)]={activeIndex === idx}
						class:border-[var(--rule)]={activeIndex !== idx}
						class:bg-[#F2F2EE]={activeIndex !== idx}
					>
						<div class="flex flex-wrap items-center justify-between gap-2">
							<span class="font-mono-tech rounded-full bg-[var(--bg-bone)] px-3 py-1 text-[11px] font-semibold text-[var(--teal)]">
								{stage.step}
							</span>
							<span class="font-mono-tech text-[11px] text-[var(--ink-muted)]">
								{stage.stack.join(' / ')}
							</span>
						</div>
						<h3 class="font-display mt-3 text-2xl font-bold text-[var(--ink)]">
							{stage.title}
						</h3>
						<div class="mt-1 text-xs font-medium text-[var(--ink-muted)]">
							{stage.subtitle}
						</div>
						<p class="mt-4 text-base leading-relaxed text-[#2A2E35]">{stage.description}</p>

						<div class="mt-5 rounded-xl bg-[var(--bg-bone)] px-4 py-3">
							<div class="font-mono-tech text-[11px] text-[var(--ink-muted)]">
								{stage.metricLabel}
							</div>
							<div class="font-mono-tech mt-0.5 text-sm font-semibold text-[var(--ink)]">
								{stage.metricValue}
							</div>
						</div>
					</article>
				{/each}
			</div>

			<div class="lg:sticky lg:top-24">
				<div class="rounded-3xl border border-slate-700/70 bg-[var(--vitrine)] p-6 text-[var(--vitrine-ink)] shadow-[0_24px_56px_-22px_rgba(17,19,23,0.45)] sm:p-7">
					<div class="pb-3">
						<div class="flex items-center justify-between font-mono-tech text-xs">
							<span class="font-semibold text-white transition-opacity duration-300">
								{activeStage.title}
							</span>
							<span class="rounded-full bg-[var(--vitrine-panel)] px-3 py-0.5 text-[11px] font-semibold text-[var(--vitrine-ok)]">
								{activeStage.step}
							</span>
						</div>
						<div class="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-slate-700/70">
							<div
								class="h-full origin-left rounded-full bg-[var(--vitrine-ok)] transition-transform duration-150 ease-out"
								style:transform={`scaleX(${Math.max(0.08, scrollProgress)})`}
							></div>
						</div>
					</div>

					<div class="my-4 overflow-hidden rounded-2xl border border-slate-700/60 bg-[var(--vitrine-panel)]">
						{#key activeIndex}
							<div class="panel-swap-enter">
								{#if activeIndex === 0}
									<svg viewBox="0 0 560 320" class="h-auto w-full p-3" role="img" aria-label="Comparing raw heuristic errors with calibrated conformal and causal profit curves">
										<line x1="48" y1="274" x2="520" y2="274" stroke="#475569" stroke-width="1.3" />
										<line x1="48" y1="30" x2="48" y2="274" stroke="#475569" stroke-width="1.3" />
										<path
											d="M 48 266 C 175 232, 290 150, 512 72 L 512 42 C 320 96, 185 186, 48 238 Z"
											fill="#7FD4C2"
											fill-opacity="0.14"
										/>
										<path
											d="M 48 274 C 165 140, 315 76, 512 52"
											fill="none"
											stroke="#7FD4C2"
											stroke-width="3"
											stroke-linecap="round"
											class="scrolly-curve"
										/>
										<path
											d="M 48 274 C 175 190, 320 142, 512 132"
											fill="none"
											stroke="#E8A394"
											stroke-width="2.2"
											stroke-linecap="round"
											class="scrolly-curve"
										/>
										<circle cx="512" cy="52" r="6.5" fill="#7FD4C2" />
										<circle cx="512" cy="132" r="5.5" fill="#E8A394" />
										<text x="60" y="46" font-family="JetBrains Mono" font-size="10.5" font-weight="600" fill="#F1F5F9">
											Conformal: 13.52% down to 1.96% FAR
										</text>
										<text x="512" y="34" text-anchor="end" font-family="JetBrains Mono" font-size="10.5" font-weight="600" fill="#7FD4C2">
											DR-Learner: $2,679.37 | 96.14% Quality
										</text>
										<text x="512" y="154" text-anchor="end" font-family="JetBrains Mono" font-size="10" fill="#E8A394">
											Naive Propensity: $1,529.02
										</text>
									</svg>
								{:else if activeIndex === 1}
									<svg viewBox="0 0 560 320" class="h-auto w-full p-3" role="img" aria-label="Transforming fragmented manual operations into structured full-stack platforms">
										<text x="136" y="28" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" font-weight="600" fill="#E8A394">
											Fragmented Problem
										</text>
										<text x="416" y="28" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" font-weight="600" fill="#7FD4C2">
											Structured System
										</text>

										<rect x="20" y="48" width="232" height="68" rx="12" fill="#1E242C" stroke="#475569" stroke-width="1.2" />
										<text x="136" y="76" text-anchor="middle" font-family="JetBrains Mono" font-size="10.5" font-weight="600" fill="#F1F5F9">
											Manual Grading &amp; KPI Sheets
										</text>
										<text x="136" y="96" text-anchor="middle" font-family="JetBrains Mono" font-size="9.2" fill="#A3AEBC">
											Slow exam sync &amp; scattered reports
										</text>

										<rect x="20" y="132" width="232" height="68" rx="12" fill="#1E242C" stroke="#475569" stroke-width="1.2" />
										<text x="136" y="160" text-anchor="middle" font-family="JetBrains Mono" font-size="10.5" font-weight="600" fill="#F1F5F9">
											Unstructured Tour &amp; CMS Edits
										</text>
										<text x="136" y="180" text-anchor="middle" font-family="JetBrains Mono" font-size="9.2" fill="#A3AEBC">
											Manual inquiries &amp; single-language pages
										</text>

										<rect x="20" y="216" width="232" height="72" rx="12" fill="#1E242C" stroke="#475569" stroke-width="1.2" />
										<text x="136" y="244" text-anchor="middle" font-family="JetBrains Mono" font-size="10.5" font-weight="600" fill="#F1F5F9">
											Clinic Records Without Docs
										</text>
										<text x="136" y="264" text-anchor="middle" font-family="JetBrains Mono" font-size="9.2" fill="#A3AEBC">
											Ad-hoc endpoints without contract specs
										</text>

										<line x1="252" y1="82" x2="296" y2="82" stroke="#7FD4C2" stroke-width="1.5" stroke-dasharray="4 3" />
										<line x1="252" y1="166" x2="296" y2="166" stroke="#7FD4C2" stroke-width="1.5" stroke-dasharray="4 3" />
										<line x1="252" y1="252" x2="296" y2="252" stroke="#7FD4C2" stroke-width="1.5" stroke-dasharray="4 3" />

										<rect x="296" y="48" width="244" height="68" rx="12" fill="#1E242C" stroke="#7FD4C2" stroke-width="1.3" />
										<text x="418" y="76" text-anchor="middle" font-family="JetBrains Mono" font-size="10.5" font-weight="600" fill="#FFFFFF">
											Smart School Platform
										</text>
										<text x="418" y="96" text-anchor="middle" font-family="JetBrains Mono" font-size="9.2" fill="#7FD4C2">
											Laravel Queues | LLM | DashboardService
										</text>

										<rect x="296" y="132" width="244" height="68" rx="12" fill="#1E242C" stroke="#7FD4C2" stroke-width="1.3" />
										<text x="418" y="160" text-anchor="middle" font-family="JetBrains Mono" font-size="10.5" font-weight="600" fill="#FFFFFF">
											Localive &amp; Jogja Tour
										</text>
										<text x="418" y="180" text-anchor="middle" font-family="JetBrains Mono" font-size="9.2" fill="#7FD4C2">
											Bilingual RBAC CMS | JSON Failover
										</text>

										<rect x="296" y="216" width="244" height="72" rx="12" fill="#1E242C" stroke="#7FD4C2" stroke-width="1.3" />
										<text x="418" y="244" text-anchor="middle" font-family="JetBrains Mono" font-size="10.5" font-weight="600" fill="#FFFFFF">
											Tentang Dental Backend
										</text>
										<text x="418" y="264" text-anchor="middle" font-family="JetBrains Mono" font-size="9.2" fill="#7FD4C2">
											Laravel REST API + OpenAPI Scramble
										</text>
									</svg>
								{:else}
									<svg viewBox="0 0 560 320" class="h-auto w-full p-3" role="img" aria-label="Automating real-time anomaly monitoring and repetitive developer workflows">
										<text x="280" y="28" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" font-weight="600" fill="#A3AEBC">
											Event Ingestion  /  Autonomous Reasoning  /  Keyboard Workflows
										</text>

										<line x1="168" y1="98" x2="208" y2="98" stroke="#7FD4C2" stroke-width="1.8" stroke-dasharray="5 4" />
										<line x1="352" y1="98" x2="392" y2="98" stroke="#E8A394" stroke-width="1.8" stroke-dasharray="5 4" />
										<path d="M 280 198 L 280 140" fill="none" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="4 4" />
										<path d="M 464 198 L 464 140" fill="none" stroke="#7FD4C2" stroke-width="1.5" stroke-dasharray="4 4" />

										<rect x="24" y="56" width="144" height="84" rx="12" fill="#1E242C" stroke="#7FD4C2" stroke-width="1.3" />
										<text x="96" y="84" text-anchor="middle" font-family="JetBrains Mono" font-size="11.5" font-weight="600" fill="#FFFFFF">
											NATS / Go
										</text>
										<text x="96" y="103" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" fill="#A3AEBC">
											Stream Triggers
										</text>
										<text x="96" y="124" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" font-weight="600" fill="#7FD4C2">
											&gt;3% | &gt;5x Vol
										</text>

										<rect x="208" y="56" width="144" height="84" rx="12" fill="#1E242C" stroke="#E8A394" stroke-width="1.3" />
										<text x="280" y="84" text-anchor="middle" font-family="JetBrains Mono" font-size="11.5" font-weight="600" fill="#FFFFFF">
											LangGraph
										</text>
										<text x="280" y="103" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" fill="#A3AEBC">
											5-Stage Worker
										</text>
										<text x="280" y="124" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" font-weight="600" fill="#E8A394">
											Auto Alerting
										</text>

										<rect x="392" y="56" width="144" height="84" rx="12" fill="#1E242C" stroke="#475569" stroke-width="1.3" />
										<text x="464" y="84" text-anchor="middle" font-family="JetBrains Mono" font-size="11.5" font-weight="600" fill="#FFFFFF">
											TimescaleDB
										</text>
										<text x="464" y="103" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" fill="#A3AEBC">
											4 Airflow DAGs
										</text>
										<text x="464" y="124" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" font-weight="600" fill="#7FD4C2">
											Feature Store
										</text>

										<rect x="24" y="198" width="512" height="92" rx="14" fill="#1E242C" stroke="#475569" stroke-width="1.2" />
										<text x="280" y="226" text-anchor="middle" font-family="JetBrains Mono" font-size="11" font-weight="600" fill="#FFFFFF">
											Glzr Workspace  /  Trello CLI  /  End-to-End MLflow Pipeline
										</text>
										<text x="280" y="248" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" fill="#7FD4C2">
											Terminal-first speed &amp; reproducible Parquet training runs
										</text>
										<text x="280" y="272" text-anchor="middle" font-family="JetBrains Mono" font-size="9.2" fill="#A3AEBC">
											Replacing manual context-switching with automated pipelines
										</text>
									</svg>
								{/if}
							</div>
						{/key}
					</div>

					<div class="font-mono-tech text-xs text-[var(--vitrine-muted)]">
						{activeStage.metricLabel} | <span class="text-slate-200">{activeStage.metricValue}</span>
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
