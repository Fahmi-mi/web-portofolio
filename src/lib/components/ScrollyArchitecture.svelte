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
			const ratio = Math.min(1, Math.max(0, traveled / totalSpan));
			scrollProgress = ratio;

			// Also resolve active step cleanly by comparing card centers to viewport focal line
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

<section id="pipeline" bind:this={sectionEl} class="scroll-mt-16 border-b border-[var(--rule)] bg-[var(--bg-bone)]">
	<div class="w-full px-6 py-16 sm:px-10 lg:px-14 lg:py-20 xl:px-20">
		<div class="flex flex-col justify-between gap-4 border-b border-[var(--ink)] pb-6 md:flex-row md:items-end">
			<div>
				<h2 class="font-display text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-4xl">
					How Systems Scale
				</h2>
				<p class="mt-2 max-w-[65ch] text-base text-[var(--ink-muted)]">
					Scroll through the three architectural pillars linking statistical bounds, causal optimization, and real-time pipelines.
				</p>
			</div>
			<div class="flex flex-wrap gap-2" role="group" aria-label="Jump to architecture stage">
				{#each SCROLL_STAGES as stage, idx}
					<button
						type="button"
						aria-pressed={activeIndex === idx}
						onclick={() => jumpToStage(idx)}
						class="font-mono-tech border px-3 py-1.5 text-xs uppercase transition-colors duration-300"
						class:border-[var(--ink)]={activeIndex === idx}
						class:bg-[var(--ink)]={activeIndex === idx}
						class:text-[var(--bg-plate)]={activeIndex === idx}
						class:border-[var(--rule)]={activeIndex !== idx}
						class:bg-[var(--bg-plate)]={activeIndex !== idx}
						class:text-[var(--ink)]={activeIndex !== idx}
					>
						{stage.step}
					</button>
				{/each}
			</div>
		</div>

		<div class="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
			<div class="space-y-8 lg:space-y-44 lg:pt-6 lg:pb-16">
				{#each SCROLL_STAGES as stage, idx (stage.id)}
					<article
						bind:this={stepEls[idx]}
						data-stage-index={idx}
						class="border p-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
						class:border-[var(--ink)]={activeIndex === idx}
						class:bg-[var(--bg-plate)]={activeIndex === idx}
						class:opacity-100={activeIndex === idx}
						class:border-[var(--rule)]={activeIndex !== idx}
						class:bg-[var(--bg-bone)]={activeIndex !== idx}
						class:opacity-65={activeIndex !== idx}
					>
						<h3 class="font-display text-2xl font-bold text-[var(--ink)]">
							{stage.title}
						</h3>
						<div class="font-mono-tech mt-1 text-xs font-semibold text-[var(--teal)] uppercase">
							{stage.step} | {stage.subtitle}
						</div>
						<p class="mt-4 text-base leading-relaxed text-[#2A2E35]">{stage.description}</p>

						<div class="mt-5 border-t border-[var(--rule)] pt-4">
							<div class="font-mono-tech text-[11px] text-[var(--ink-muted)] uppercase">
								{stage.metricLabel}
							</div>
							<div class="font-mono-tech mt-1 text-sm font-semibold text-[var(--ink)]">
								{stage.metricValue}
							</div>
						</div>

						<div class="mt-4 flex flex-wrap gap-1.5">
							{#each stage.stack as tech}
								<span class="font-mono-tech border border-[var(--rule)] bg-[var(--bg-bone)] px-2.5 py-0.5 text-[11px] text-[var(--ink)]">
									{tech}
								</span>
							{/each}
						</div>
					</article>
				{/each}
			</div>

			<div class="lg:sticky lg:top-24">
				<div class="specimen-dot-grid border border-[var(--ink)] p-6">
					<!-- Continuous scroll progress track + shared live title bar -->
					<div class="border-b border-[var(--ink)] pb-3">
						<div class="flex items-center justify-between font-mono-tech text-xs">
							<span class="font-semibold text-[var(--ink)] uppercase transition-opacity duration-300">
								{activeStage.title}
							</span>
							<span class="text-[var(--teal)]">{activeStage.step}</span>
						</div>
						<div class="mt-2.5 h-[2px] w-full bg-[var(--rule)] overflow-hidden">
							<div
								class="h-full origin-left bg-[var(--teal)] transition-transform duration-150 ease-out"
								style:transform={`scaleX(${Math.max(0.08, scrollProgress)})`}
							></div>
						</div>
					</div>

					<!-- Layered smooth cross-fade stage plates -->
					<div class="relative my-5 grid overflow-hidden">
						<!-- Stage 01: Statistical ML & Causal Modeling -->
						<div
							aria-hidden={activeIndex !== 0}
							class="col-start-1 row-start-1 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
							class:opacity-100={activeIndex === 0}
							class:translate-y-0={activeIndex === 0}
							class:scale-100={activeIndex === 0}
							class:opacity-0={activeIndex !== 0}
							class:translate-y-3={activeIndex !== 0}
							class:scale-[0.985]={activeIndex !== 0}
							class:pointer-events-none={activeIndex !== 0}
						>
							<svg viewBox="0 0 560 320" class="h-auto w-full border border-[var(--rule)] bg-[var(--bg-plate)] p-3" role="img" aria-label="Statistical ML conformal calibration and causal profit curves">
								<line x1="48" y1="274" x2="520" y2="274" stroke="#111317" stroke-width="1.3" />
								<line x1="48" y1="30" x2="48" y2="274" stroke="#111317" stroke-width="1.3" />
								<path
									d="M 48 266 C 175 232, 290 150, 512 72 L 512 42 C 320 96, 185 186, 48 238 Z"
									fill="#0F766E"
									fill-opacity="0.12"
								/>
								<path
									d="M 48 274 C 165 140, 315 76, 512 52"
									fill="none"
									stroke="#0F766E"
									stroke-width="3"
									class="scrolly-curve"
									class:is-drawn={activeIndex === 0}
								/>
								<path
									d="M 48 274 C 175 190, 320 142, 512 132"
									fill="none"
									stroke="#B8381E"
									stroke-width="2.2"
									class="scrolly-curve"
									class:is-drawn={activeIndex === 0}
								/>
								<circle cx="512" cy="52" r="7" fill="#0F766E" />
								<circle cx="512" cy="132" r="6" fill="#B8381E" />
								<circle cx="268" cy="148" r="6" fill="#111317" />
								<text x="60" y="46" font-family="JetBrains Mono" font-size="10.5" font-weight="600" fill="#111317">
									CONFORMAL: 13.52% down to 1.96% FAR
								</text>
								<text x="512" y="34" text-anchor="end" font-family="JetBrains Mono" font-size="10.5" font-weight="600" fill="#0F766E">
									DR-LEARNER: $2,679.37 | 96.14% QUAL
								</text>
								<text x="512" y="154" text-anchor="end" font-family="JetBrains Mono" font-size="10" fill="#B8381E">
									PROPENSITY: $1,529.02
								</text>
							</svg>
						</div>

						<!-- Stage 02: Streaming Agents & ML Data Pipelines -->
						<div
							aria-hidden={activeIndex !== 1}
							class="col-start-1 row-start-1 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
							class:opacity-100={activeIndex === 1}
							class:translate-y-0={activeIndex === 1}
							class:scale-100={activeIndex === 1}
							class:opacity-0={activeIndex !== 1}
							class:translate-y-3={activeIndex !== 1}
							class:scale-[0.985]={activeIndex !== 1}
							class:pointer-events-none={activeIndex !== 1}
						>
							<svg viewBox="0 0 560 320" class="h-auto w-full border border-[var(--ink)] bg-[var(--vitrine)] p-3" role="img" aria-label="Streaming event bus, LangGraph worker, Airflow DAGs, and tabular MLflow pipeline">
								<text x="24" y="28" font-family="JetBrains Mono" font-size="10" fill="#A3AEBC">
									EVENT BUS  /  REASONING WORKER  /  AIRFLOW &amp; TABULAR MLOPS
								</text>

								<line x1="168" y1="98" x2="208" y2="98" stroke="#7FD4C2" stroke-width="2" stroke-dasharray="5 4" />
								<line x1="352" y1="98" x2="392" y2="98" stroke="#E8A394" stroke-width="2" stroke-dasharray="5 4" />
								<path d="M 280 198 L 280 140" fill="none" stroke="#A3AEBC" stroke-width="1.5" stroke-dasharray="4 4" />
								<path d="M 464 198 L 464 140" fill="none" stroke="#7FD4C2" stroke-width="1.5" stroke-dasharray="4 4" />

								<rect x="24" y="56" width="144" height="84" fill="#262E38" stroke="#7FD4C2" stroke-width="1.5" />
								<text x="96" y="84" text-anchor="middle" font-family="JetBrains Mono" font-size="11.5" font-weight="600" fill="#E5E7EB">
									NATS / Go
								</text>
								<text x="96" y="103" text-anchor="middle" font-family="JetBrains Mono" font-size="10" fill="#A3AEBC">
									Protobuf Gateway
								</text>
								<text x="96" y="124" text-anchor="middle" font-family="JetBrains Mono" font-size="10" fill="#7FD4C2">
									&gt;3% | &gt;5x Vol
								</text>

								<rect x="208" y="56" width="144" height="84" fill="#262E38" stroke="#E8A394" stroke-width="1.5" />
								<text x="280" y="84" text-anchor="middle" font-family="JetBrains Mono" font-size="11.5" font-weight="600" fill="#E5E7EB">
									LangGraph
								</text>
								<text x="280" y="103" text-anchor="middle" font-family="JetBrains Mono" font-size="10" fill="#A3AEBC">
									5-Stage DeepSeek
								</text>
								<text x="280" y="124" text-anchor="middle" font-family="JetBrains Mono" font-size="10" fill="#E8A394">
									HITL + Cache Guard
								</text>

								<rect x="392" y="56" width="144" height="84" fill="#262E38" stroke="#A3AEBC" stroke-width="1.5" />
								<text x="464" y="84" text-anchor="middle" font-family="JetBrains Mono" font-size="11.5" font-weight="600" fill="#E5E7EB">
									TimescaleDB
								</text>
								<text x="464" y="103" text-anchor="middle" font-family="JetBrains Mono" font-size="10" fill="#A3AEBC">
									Hypertables + Redis
								</text>
								<text x="464" y="124" text-anchor="middle" font-family="JetBrains Mono" font-size="10" fill="#7FD4C2">
									5m Hot Window
								</text>

								<rect x="24" y="198" width="512" height="92" fill="#262E38" stroke="#64748B" stroke-width="1.5" />
								<text x="280" y="226" text-anchor="middle" font-family="JetBrains Mono" font-size="11.5" font-weight="600" fill="#E5E7EB">
									4 Apache Airflow DAGs (1m / 5m / 1h) + Tabular MLflow Pipeline
								</text>
								<text x="280" y="248" text-anchor="middle" font-family="JetBrains Mono" font-size="10" fill="#7FD4C2">
									Parquet | LightGBM / XGBoost / CatBoost | feature_store_ai
								</text>
								<text x="280" y="272" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" fill="#A3AEBC">
									Validated with Pydantic contracts &amp; automated pytest verification
								</text>
							</svg>
						</div>

						<!-- Stage 03: Production Web, APIs & CLI Tooling -->
						<div
							aria-hidden={activeIndex !== 2}
							class="col-start-1 row-start-1 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
							class:opacity-100={activeIndex === 2}
							class:translate-y-0={activeIndex === 2}
							class:scale-100={activeIndex === 2}
							class:opacity-0={activeIndex !== 2}
							class:translate-y-3={activeIndex !== 2}
							class:scale-[0.985]={activeIndex !== 2}
							class:pointer-events-none={activeIndex !== 2}
						>
							<svg viewBox="0 0 560 320" class="h-auto w-full border border-[var(--rule)] bg-[var(--bg-plate)] p-3" role="img" aria-label="Production web systems, REST APIs, and open-source developer tools topology">
								<text x="24" y="28" font-family="JetBrains Mono" font-size="10" fill="#4B525A">
									CLIENT WEB PLATFORMS  |  REST APIS  |  OPEN-SOURCE WORKSPACE &amp; CLIS
								</text>

								<!-- Left Column: Client & Backend Production -->
								<rect x="24" y="48" width="246" height="68" fill="#FAF9F5" stroke="#111317" stroke-width="1.3" />
								<text x="38" y="72" font-family="JetBrains Mono" font-size="11" font-weight="600" fill="#111317">
									Smart School Platform
								</text>
								<text x="38" y="92" font-family="JetBrains Mono" font-size="9.5" fill="#0F766E">
									Laravel Queues | Livewire | LLM Pipeline
								</text>

								<rect x="24" y="130" width="246" height="68" fill="#FAF9F5" stroke="#111317" stroke-width="1.3" />
								<text x="38" y="154" font-family="JetBrains Mono" font-size="11" font-weight="600" fill="#111317">
									Localive &amp; Jogja Tour
								</text>
								<text x="38" y="174" font-family="JetBrains Mono" font-size="9.5" fill="#0F766E">
									ID/EN CMS + RBAC | MySQL + JSON Failover
								</text>

								<rect x="24" y="212" width="246" height="72" fill="#FAF9F5" stroke="#D8D4CA" stroke-width="1.3" />
								<text x="38" y="238" font-family="JetBrains Mono" font-size="11" font-weight="600" fill="#111317">
									tentang-dental-be
								</text>
								<text x="38" y="258" font-family="JetBrains Mono" font-size="9.5" fill="#4B525A">
									Laravel REST API | Scramble OpenAPI Docs
								</text>

								<!-- Center Bridge Lines -->
								<line x1="270" y1="82" x2="290" y2="82" stroke="#0F766E" stroke-width="1.5" />
								<line x1="270" y1="164" x2="290" y2="164" stroke="#B8381E" stroke-width="1.5" />
								<line x1="270" y1="248" x2="290" y2="248" stroke="#4B525A" stroke-width="1.5" />

								<!-- Right Column: Open-Source & Interactive Web -->
								<rect x="290" y="48" width="246" height="68" fill="#1E242C" stroke="#1E242C" stroke-width="1.3" />
								<text x="304" y="72" font-family="JetBrains Mono" font-size="11" font-weight="600" fill="#E5E7EB">
									glzr (Linux Workspace)
								</text>
								<text x="304" y="92" font-family="JetBrains Mono" font-size="9.5" fill="#7FD4C2">
									Svelte | Terminal-First Layout Tooling
								</text>

								<rect x="290" y="130" width="246" height="68" fill="#1E242C" stroke="#1E242C" stroke-width="1.3" />
								<text x="304" y="154" font-family="JetBrains Mono" font-size="11" font-weight="600" fill="#E5E7EB">
									trello-cli
								</text>
								<text x="304" y="174" font-family="JetBrains Mono" font-size="9.5" fill="#E8A394">
									TypeScript + Ink Interactive Board TUI
								</text>

								<rect x="290" y="212" width="246" height="72" fill="#FAF9F5" stroke="#B8381E" stroke-width="1.3" />
								<text x="304" y="238" font-family="JetBrains Mono" font-size="11" font-weight="600" fill="#111317">
									snapshoot
								</text>
								<text x="304" y="258" font-family="JetBrains Mono" font-size="9.5" fill="#B8381E">
									Live Browser Canvas Web App
								</text>
							</svg>
						</div>
					</div>

					<div class="font-mono-tech text-xs text-[var(--ink-muted)] transition-opacity duration-300">
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
