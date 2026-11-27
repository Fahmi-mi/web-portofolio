<script lang="ts">
	import { onMount } from 'svelte';
	import { SCROLL_STAGES } from '$lib/data/portfolio';
	import { clampScrollStage } from '$lib/utils/interactions';

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
						class="rounded-2xl border p-6 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:p-7"
						class:border-[var(--teal)]={activeIndex === idx}
						class:bg-[var(--bg-plate)]={activeIndex === idx}
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
				<div class="rounded-3xl border border-[var(--rule)] bg-[var(--bg-plate)] p-6 sm:p-7">
					<div class="pb-3">
						<div class="flex items-center justify-between font-mono-tech text-xs">
							<span class="font-semibold text-[var(--ink)] transition-opacity duration-300">
								{activeStage.title}
							</span>
							<span class="rounded-full bg-[var(--bg-bone)] px-3 py-0.5 text-[11px] font-semibold text-[var(--teal)]">
								{activeStage.step}
							</span>
						</div>
						<div class="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-[var(--rule)]">
							<div
								class="h-full origin-left rounded-full bg-[var(--teal)] transition-transform duration-150 ease-out"
								style:transform={`scaleX(${Math.max(0.08, scrollProgress)})`}
							></div>
						</div>
					</div>

					<div class="my-4 overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--bg-bone)]">
						{#if activeIndex === 0}
							<svg viewBox="0 0 560 320" class="h-auto w-full p-3" role="img" aria-label="Comparing raw heuristic errors with calibrated conformal and causal profit curves">
								<line x1="48" y1="274" x2="520" y2="274" stroke="#E4E4DF" stroke-width="1.3" />
								<line x1="48" y1="30" x2="48" y2="274" stroke="#E4E4DF" stroke-width="1.3" />
								<path
									d="M 48 266 C 175 232, 290 150, 512 72 L 512 42 C 320 96, 185 186, 48 238 Z"
									fill="#0F766E"
									fill-opacity="0.11"
								/>
								<path
									d="M 48 274 C 165 140, 315 76, 512 52"
									fill="none"
									stroke="#0F766E"
									stroke-width="3"
									stroke-linecap="round"
									class="scrolly-curve is-drawn"
								/>
								<path
									d="M 48 274 C 175 190, 320 142, 512 132"
									fill="none"
									stroke="#B8381E"
									stroke-width="2.2"
									stroke-linecap="round"
									class="scrolly-curve is-drawn"
								/>
								<circle cx="512" cy="52" r="6.5" fill="#0F766E" />
								<circle cx="512" cy="132" r="5.5" fill="#B8381E" />
								<text x="60" y="46" font-family="JetBrains Mono" font-size="10.5" font-weight="600" fill="#111317">
									Conformal: 13.52% down to 1.96% FAR
								</text>
								<text x="512" y="34" text-anchor="end" font-family="JetBrains Mono" font-size="10.5" font-weight="600" fill="#0F766E">
									DR-Learner: $2,679.37 | 96.14% Quality
								</text>
								<text x="512" y="154" text-anchor="end" font-family="JetBrains Mono" font-size="10" fill="#B8381E">
									Naive Propensity: $1,529.02
								</text>
							</svg>
						{:else if activeIndex === 1}
							<svg viewBox="0 0 560 320" class="h-auto w-full p-3" role="img" aria-label="Transforming fragmented manual operations into structured full-stack platforms">
								<text x="136" y="28" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" font-weight="600" fill="#B8381E">
									Fragmented Problem
								</text>
								<text x="416" y="28" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" font-weight="600" fill="#0F766E">
									Structured System
								</text>

								<rect x="20" y="48" width="232" height="68" rx="12" fill="#FFFFFF" stroke="#E4E4DF" stroke-width="1.3" />
								<text x="136" y="76" text-anchor="middle" font-family="JetBrains Mono" font-size="10.5" font-weight="600" fill="#111317">
									Manual Grading &amp; KPI Sheets
								</text>
								<text x="136" y="96" text-anchor="middle" font-family="JetBrains Mono" font-size="9.2" fill="#4B525A">
									Slow exam sync &amp; scattered reports
								</text>

								<rect x="20" y="132" width="232" height="68" rx="12" fill="#FFFFFF" stroke="#E4E4DF" stroke-width="1.3" />
								<text x="136" y="160" text-anchor="middle" font-family="JetBrains Mono" font-size="10.5" font-weight="600" fill="#111317">
									Unstructured Tour &amp; CMS Edits
								</text>
								<text x="136" y="180" text-anchor="middle" font-family="JetBrains Mono" font-size="9.2" fill="#4B525A">
									Manual inquiries &amp; single-language pages
								</text>

								<rect x="20" y="216" width="232" height="72" rx="12" fill="#FFFFFF" stroke="#E4E4DF" stroke-width="1.3" />
								<text x="136" y="244" text-anchor="middle" font-family="JetBrains Mono" font-size="10.5" font-weight="600" fill="#111317">
									Clinic Records Without Docs
								</text>
								<text x="136" y="264" text-anchor="middle" font-family="JetBrains Mono" font-size="9.2" fill="#4B525A">
									Ad-hoc endpoints without contract specs
								</text>

								<line x1="252" y1="82" x2="296" y2="82" stroke="#0F766E" stroke-width="1.5" stroke-dasharray="4 3" />
								<line x1="252" y1="166" x2="296" y2="166" stroke="#0F766E" stroke-width="1.5" stroke-dasharray="4 3" />
								<line x1="252" y1="252" x2="296" y2="252" stroke="#0F766E" stroke-width="1.5" stroke-dasharray="4 3" />

								<rect x="296" y="48" width="244" height="68" rx="12" fill="#FFFFFF" stroke="#0F766E" stroke-width="1.4" />
								<text x="418" y="76" text-anchor="middle" font-family="JetBrains Mono" font-size="10.5" font-weight="600" fill="#111317">
									Smart School Platform
								</text>
								<text x="418" y="96" text-anchor="middle" font-family="JetBrains Mono" font-size="9.2" fill="#0F766E">
									Laravel Queues | LLM | DashboardService
								</text>

								<rect x="296" y="132" width="244" height="68" rx="12" fill="#FFFFFF" stroke="#0F766E" stroke-width="1.4" />
								<text x="418" y="160" text-anchor="middle" font-family="JetBrains Mono" font-size="10.5" font-weight="600" fill="#111317">
									Localive &amp; Jogja Tour
								</text>
								<text x="418" y="180" text-anchor="middle" font-family="JetBrains Mono" font-size="9.2" fill="#0F766E">
									Bilingual RBAC CMS | JSON Failover
								</text>

								<rect x="296" y="216" width="244" height="72" rx="12" fill="#FFFFFF" stroke="#0F766E" stroke-width="1.4" />
								<text x="418" y="244" text-anchor="middle" font-family="JetBrains Mono" font-size="10.5" font-weight="600" fill="#111317">
									Tentang Dental Backend
								</text>
								<text x="418" y="264" text-anchor="middle" font-family="JetBrains Mono" font-size="9.2" fill="#0F766E">
									Laravel REST API + OpenAPI Scramble
								</text>
							</svg>
						{:else}
							<svg viewBox="0 0 560 320" class="h-auto w-full p-3" role="img" aria-label="Automating real-time anomaly monitoring and repetitive developer workflows">
								<text x="280" y="28" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" font-weight="600" fill="#4B525A">
									Event Ingestion  /  Autonomous Reasoning  /  Keyboard Workflows
								</text>

								<line x1="168" y1="98" x2="208" y2="98" stroke="#0F766E" stroke-width="1.8" stroke-dasharray="5 4" />
								<line x1="352" y1="98" x2="392" y2="98" stroke="#B8381E" stroke-width="1.8" stroke-dasharray="5 4" />
								<path d="M 280 198 L 280 140" fill="none" stroke="#4B525A" stroke-width="1.5" stroke-dasharray="4 4" />
								<path d="M 464 198 L 464 140" fill="none" stroke="#0F766E" stroke-width="1.5" stroke-dasharray="4 4" />

								<rect x="24" y="56" width="144" height="84" rx="12" fill="#FFFFFF" stroke="#0F766E" stroke-width="1.4" />
								<text x="96" y="84" text-anchor="middle" font-family="JetBrains Mono" font-size="11.5" font-weight="600" fill="#111317">
									NATS / Go
								</text>
								<text x="96" y="103" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" fill="#4B525A">
									Stream Triggers
								</text>
								<text x="96" y="124" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" font-weight="600" fill="#0F766E">
									&gt;3% | &gt;5x Vol
								</text>

								<rect x="208" y="56" width="144" height="84" rx="12" fill="#FFFFFF" stroke="#B8381E" stroke-width="1.4" />
								<text x="280" y="84" text-anchor="middle" font-family="JetBrains Mono" font-size="11.5" font-weight="600" fill="#111317">
									LangGraph
								</text>
								<text x="280" y="103" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" fill="#4B525A">
									5-Stage Worker
								</text>
								<text x="280" y="124" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" font-weight="600" fill="#B8381E">
									Auto Alerting
								</text>

								<rect x="392" y="56" width="144" height="84" rx="12" fill="#FFFFFF" stroke="#E4E4DF" stroke-width="1.4" />
								<text x="464" y="84" text-anchor="middle" font-family="JetBrains Mono" font-size="11.5" font-weight="600" fill="#111317">
									TimescaleDB
								</text>
								<text x="464" y="103" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" fill="#4B525A">
									4 Airflow DAGs
								</text>
								<text x="464" y="124" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" font-weight="600" fill="#0F766E">
									Feature Store
								</text>

								<rect x="24" y="198" width="512" height="92" rx="14" fill="#FFFFFF" stroke="#E4E4DF" stroke-width="1.4" />
								<text x="280" y="226" text-anchor="middle" font-family="JetBrains Mono" font-size="11" font-weight="600" fill="#111317">
									Glzr Workspace  /  Trello CLI  /  End-to-End MLflow Pipeline
								</text>
								<text x="280" y="248" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" fill="#0F766E">
									Terminal-first speed &amp; reproducible Parquet training runs
								</text>
								<text x="280" y="272" text-anchor="middle" font-family="JetBrains Mono" font-size="9.2" fill="#4B525A">
									Replacing manual context-switching with automated pipelines
								</text>
							</svg>
						{/if}
					</div>

					<div class="font-mono-tech text-xs text-[var(--ink-muted)]">
						{activeStage.metricLabel} | {activeStage.metricValue}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.scrolly-curve {
		stroke-dasharray: 900;
		stroke-dashoffset: 900;
		transition: stroke-dashoffset 1.1s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.scrolly-curve.is-drawn {
		stroke-dashoffset: 0;
	}

	@media (prefers-reduced-motion: reduce) {
		.scrolly-curve {
			stroke-dashoffset: 0;
			transition: none;
		}
	}
</style>
