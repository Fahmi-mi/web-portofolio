<script lang="ts">
	import { onMount } from 'svelte';
	import { PROFILE, SCROLL_STAGES } from '$lib/data/portfolio';
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
		<div class="flex flex-col justify-between gap-6 border-b border-[var(--ink)] pb-7 md:flex-row md:items-end">
			<div>
				<h2 class="font-display text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-4xl">
					About &amp; How Systems Scale
				</h2>
				<p class="mt-3 max-w-[68ch] text-base leading-relaxed text-[var(--ink-muted)]">
					{PROFILE.degree} at {PROFILE.university}—pairing statistical rigor with resilient backend execution across three engineering pillars.
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

		<div class="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
			<div class="space-y-8 lg:space-y-44 lg:pt-6 lg:pb-16">
				{#each SCROLL_STAGES as stage, idx (stage.id)}
					<article
						bind:this={stepEls[idx]}
						data-stage-index={idx}
						class="border p-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:p-7"
						class:border-[var(--ink)]={activeIndex === idx}
						class:bg-[var(--bg-plate)]={activeIndex === idx}
						class:opacity-100={activeIndex === idx}
						class:border-[var(--rule)]={activeIndex !== idx}
						class:bg-[var(--bg-bone)]={activeIndex !== idx}
						class:opacity-60={activeIndex !== idx}
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

						<div class="font-mono-tech mt-4 text-[11px] text-[var(--ink-muted)]">
							{stage.stack.join(' / ')}
						</div>
					</article>
				{/each}
			</div>

			<div class="lg:sticky lg:top-24">
				<div class="border border-[var(--rule)] bg-[var(--bg-plate)] p-6">
					<div class="border-b border-[var(--rule)] pb-3">
						<div class="flex items-center justify-between font-mono-tech text-xs">
							<span class="font-semibold text-[var(--ink)] uppercase transition-opacity duration-300">
								{activeStage.title}
							</span>
							<span class="text-[var(--teal)]">{activeStage.step}</span>
						</div>
						<div class="mt-2.5 h-[2px] w-full overflow-hidden bg-[var(--rule)]">
							<div
								class="h-full origin-left bg-[var(--teal)] transition-transform duration-150 ease-out"
								style:transform={`scaleX(${Math.max(0.08, scrollProgress)})`}
							></div>
						</div>
					</div>

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
							<svg viewBox="0 0 560 320" class="h-auto w-full bg-[var(--bg-bone)] p-3" role="img" aria-label="Statistical ML conformal calibration and causal profit curves">
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

						<!-- Stage 02: Streaming Agents & ML Data Pipelines (light editorial surface) -->
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
							<svg viewBox="0 0 560 320" class="h-auto w-full bg-[var(--bg-bone)] p-3" role="img" aria-label="Streaming event bus, LangGraph worker, Airflow DAGs, and tabular MLflow pipeline">
								<text x="280" y="28" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" font-weight="600" fill="#4B525A">
									EVENT BUS  /  REASONING WORKER  /  AIRFLOW &amp; TABULAR MLOPS
								</text>

								<line x1="168" y1="98" x2="208" y2="98" stroke="#0F766E" stroke-width="1.8" stroke-dasharray="5 4" />
								<line x1="352" y1="98" x2="392" y2="98" stroke="#B8381E" stroke-width="1.8" stroke-dasharray="5 4" />
								<path d="M 280 198 L 280 140" fill="none" stroke="#4B525A" stroke-width="1.5" stroke-dasharray="4 4" />
								<path d="M 464 198 L 464 140" fill="none" stroke="#0F766E" stroke-width="1.5" stroke-dasharray="4 4" />

								<rect x="24" y="56" width="144" height="84" fill="#FAF9F5" stroke="#0F766E" stroke-width="1.4" />
								<text x="96" y="84" text-anchor="middle" font-family="JetBrains Mono" font-size="11.5" font-weight="600" fill="#111317">
									NATS / Go
								</text>
								<text x="96" y="103" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" fill="#4B525A">
									Protobuf Gateway
								</text>
								<text x="96" y="124" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" font-weight="600" fill="#0F766E">
									&gt;3% | &gt;5x Vol
								</text>

								<rect x="208" y="56" width="144" height="84" fill="#FAF9F5" stroke="#B8381E" stroke-width="1.4" />
								<text x="280" y="84" text-anchor="middle" font-family="JetBrains Mono" font-size="11.5" font-weight="600" fill="#111317">
									LangGraph
								</text>
								<text x="280" y="103" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" fill="#4B525A">
									5-Stage DeepSeek
								</text>
								<text x="280" y="124" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" font-weight="600" fill="#B8381E">
									HITL + Cache Guard
								</text>

								<rect x="392" y="56" width="144" height="84" fill="#FAF9F5" stroke="#111317" stroke-width="1.3" />
								<text x="464" y="84" text-anchor="middle" font-family="JetBrains Mono" font-size="11.5" font-weight="600" fill="#111317">
									TimescaleDB
								</text>
								<text x="464" y="103" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" fill="#4B525A">
									Hypertables + Redis
								</text>
								<text x="464" y="124" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" font-weight="600" fill="#0F766E">
									5m Hot Window
								</text>

								<rect x="24" y="198" width="512" height="92" fill="#FAF9F5" stroke="#D8D4CA" stroke-width="1.4" />
								<text x="280" y="226" text-anchor="middle" font-family="JetBrains Mono" font-size="11" font-weight="600" fill="#111317">
									4 Apache Airflow DAGs (1m / 5m / 1h) + Tabular MLflow Pipeline
								</text>
								<text x="280" y="248" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" fill="#0F766E">
									Parquet | LightGBM / XGBoost / CatBoost | feature_store_ai
								</text>
								<text x="280" y="272" text-anchor="middle" font-family="JetBrains Mono" font-size="9.2" fill="#4B525A">
									Validated with Pydantic contracts &amp; automated pytest checks
								</text>
							</svg>
						</div>

						<!-- Stage 03: Production Web, APIs & CLI Tooling (uniform light editorial plates) -->
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
							<svg viewBox="0 0 560 320" class="h-auto w-full bg-[var(--bg-bone)] p-3" role="img" aria-label="Production web systems, REST APIs, and open-source developer tools topology">
								<text x="142" y="28" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" font-weight="600" fill="#4B525A">
									CLIENT WEB &amp; REST APIS
								</text>
								<text x="418" y="28" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" font-weight="600" fill="#4B525A">
									OPEN-SOURCE &amp; WEB TOOLS
								</text>

								<rect x="18" y="46" width="248" height="72" fill="#FAF9F5" stroke="#111317" stroke-width="1.3" />
								<text x="142" y="75" text-anchor="middle" font-family="JetBrains Mono" font-size="11" font-weight="600" fill="#111317">
									Smart School Platform
								</text>
								<text x="142" y="96" text-anchor="middle" font-family="JetBrains Mono" font-size="9.2" fill="#0F766E">
									Laravel Queues | Livewire | LLM
								</text>

								<rect x="18" y="132" width="248" height="72" fill="#FAF9F5" stroke="#111317" stroke-width="1.3" />
								<text x="142" y="161" text-anchor="middle" font-family="JetBrains Mono" font-size="11" font-weight="600" fill="#111317">
									Localive &amp; Jogja Tour
								</text>
								<text x="142" y="182" text-anchor="middle" font-family="JetBrains Mono" font-size="9.2" fill="#0F766E">
									ID/EN CMS | MySQL + JSON SEO
								</text>

								<rect x="18" y="218" width="248" height="74" fill="#FAF9F5" stroke="#D8D4CA" stroke-width="1.3" />
								<text x="142" y="248" text-anchor="middle" font-family="JetBrains Mono" font-size="11" font-weight="600" fill="#111317">
									tentang-dental-be
								</text>
								<text x="142" y="269" text-anchor="middle" font-family="JetBrains Mono" font-size="9.2" fill="#4B525A">
									Laravel REST API | OpenAPI
								</text>

								<line x1="266" y1="82" x2="294" y2="82" stroke="#0F766E" stroke-width="1.4" stroke-dasharray="4 3" />
								<line x1="266" y1="168" x2="294" y2="168" stroke="#B8381E" stroke-width="1.4" stroke-dasharray="4 3" />
								<line x1="266" y1="255" x2="294" y2="255" stroke="#4B525A" stroke-width="1.4" stroke-dasharray="4 3" />

								<rect x="294" y="46" width="248" height="72" fill="#FAF9F5" stroke="#0F766E" stroke-width="1.3" />
								<text x="418" y="75" text-anchor="middle" font-family="JetBrains Mono" font-size="11" font-weight="600" fill="#111317">
									glzr
								</text>
								<text x="418" y="96" text-anchor="middle" font-family="JetBrains Mono" font-size="9.2" fill="#0F766E">
									Svelte Linux Workspace
								</text>

								<rect x="294" y="132" width="248" height="72" fill="#FAF9F5" stroke="#B8381E" stroke-width="1.3" />
								<text x="418" y="161" text-anchor="middle" font-family="JetBrains Mono" font-size="11" font-weight="600" fill="#111317">
									trello-cli
								</text>
								<text x="418" y="182" text-anchor="middle" font-family="JetBrains Mono" font-size="9.2" fill="#B8381E">
									TypeScript + Ink Board TUI
								</text>

								<rect x="294" y="218" width="248" height="74" fill="#FAF9F5" stroke="#D8D4CA" stroke-width="1.3" />
								<text x="418" y="248" text-anchor="middle" font-family="JetBrains Mono" font-size="11" font-weight="600" fill="#111317">
									snapshoot
								</text>
								<text x="418" y="269" text-anchor="middle" font-family="JetBrains Mono" font-size="9.2" fill="#4B525A">
									Browser Canvas Photobooth
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
