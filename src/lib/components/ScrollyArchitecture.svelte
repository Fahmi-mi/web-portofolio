<script lang="ts">
	import { onMount } from 'svelte';
	import { SCROLL_STAGES } from '$lib/data/portfolio';
	import { clampScrollStage } from '$lib/utils/interactions';

	let activeIndex = $state(0);
	let stepEls: HTMLElement[] = [];

	const activeStage = $derived(SCROLL_STAGES[clampScrollStage(activeIndex, SCROLL_STAGES.length)]);

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					const idxAttr = entry.target.getAttribute('data-stage-index');
					if (idxAttr !== null) {
						activeIndex = clampScrollStage(Number(idxAttr), SCROLL_STAGES.length);
					}
				}
			},
			{ rootMargin: '-35% 0px -45% 0px', threshold: 0.1 }
		);

		for (const el of stepEls) {
			if (el) observer.observe(el);
		}

		return () => observer.disconnect();
	});
</script>

<section id="pipeline" class="border-b border-[var(--rule)] bg-[var(--bg-bone)]">
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
						onclick={() => (activeIndex = idx)}
						class="font-mono-tech border px-3 py-1.5 text-xs uppercase transition-colors"
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
			<div class="space-y-8 lg:space-y-24 lg:pb-16">
				{#each SCROLL_STAGES as stage, idx (stage.id)}
					<article
						bind:this={stepEls[idx]}
						data-stage-index={idx}
						class="border p-6 transition-colors duration-200"
						class:border-[var(--ink)]={activeIndex === idx}
						class:bg-[var(--bg-plate)]={activeIndex === idx}
						class:border-[var(--rule)]={activeIndex !== idx}
						class:bg-[var(--bg-bone)]={activeIndex !== idx}
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

			<div class="lg:sticky lg:top-20">
				{#if activeStage.id === 'neural-router'}
					<div class="specimen-dot-grid border border-[var(--ink)] p-6">
						<div class="flex items-center justify-between border-b border-[var(--ink)] pb-3 font-mono-tech text-xs">
							<span class="font-semibold text-[var(--ink)] uppercase">{activeStage.title}</span>
							<span class="text-[var(--teal)]">{activeStage.step}</span>
						</div>
						<svg viewBox="0 0 560 320" class="my-5 h-auto w-full border border-[var(--rule)] bg-[var(--bg-plate)] p-3" role="img" aria-label="Conformal prediction band and Pareto routing diagram">
							<path
								d="M 40 270 C 160 235, 250 140, 510 56"
								fill="none"
								stroke="#0F766E"
								stroke-width="3"
							/>
							<path
								d="M 40 292 C 160 264, 250 172, 510 88 L 510 34 C 350 75, 250 110, 40 248 Z"
								fill="#0F766E"
								fill-opacity="0.13"
							/>
							<line x1="285" y1="24" x2="285" y2="296" stroke="#B8381E" stroke-dasharray="5 5" stroke-width="1.5" />
							<circle cx="155" cy="224" r="6" fill="#111317" />
							<circle cx="285" cy="145" r="8" fill="#0F766E" />
							<circle cx="425" cy="84" r="7" fill="#B8381E" />
							<text x="48" y="46" font-family="JetBrains Mono" font-size="11" fill="#111317">
								CONFORMAL ACCEPTANCE BAND (alpha 0.05 = 1.96% FAR)
							</text>
							<text x="296" y="286" font-family="JetBrains Mono" font-size="10.5" fill="#B8381E">
								96.14% FRONTIER QUALITY (-8.50% COST)
							</text>
						</svg>
						<div class="font-mono-tech text-xs text-[var(--ink-muted)]">
							{activeStage.metricLabel} | {activeStage.metricValue}
						</div>
					</div>
				{:else if activeStage.id === 'causal-frontier'}
					<div class="specimen-dot-grid border border-[var(--ink)] p-6">
						<div class="flex items-center justify-between border-b border-[var(--ink)] pb-3 font-mono-tech text-xs">
							<span class="font-semibold text-[var(--ink)] uppercase">{activeStage.title}</span>
							<span class="text-[var(--teal)]">{activeStage.step}</span>
						</div>
						<svg viewBox="0 0 560 320" class="my-5 h-auto w-full border border-[var(--rule)] bg-[var(--bg-plate)] p-3" role="img" aria-label="Causal uplift cumulative profit frontier">
							<line x1="48" y1="276" x2="520" y2="276" stroke="#111317" stroke-width="1.5" />
							<line x1="48" y1="28" x2="48" y2="276" stroke="#111317" stroke-width="1.5" />
							<line x1="48" y1="276" x2="510" y2="208" stroke="#9CA3AF" stroke-dasharray="5 5" stroke-width="1.8" />
							<path d="M 48 276 C 175 185, 310 128, 510 118" fill="none" stroke="#B8381E" stroke-width="2.4" />
							<path d="M 48 276 C 165 130, 310 68, 510 46" fill="none" stroke="#0F766E" stroke-width="3.2" />
							<circle cx="510" cy="46" r="7" fill="#0F766E" />
							<circle cx="510" cy="118" r="6" fill="#B8381E" />
							<text x="275" y="40" font-family="JetBrains Mono" font-size="11" font-weight="600" fill="#0F766E">
								DR-LEARNER: $2,679.37 (+75%)
							</text>
							<text x="295" y="140" font-family="JetBrains Mono" font-size="10.5" fill="#B8381E">
								PROPENSITY: $1,529.02
							</text>
							<text x="330" y="232" font-family="JetBrains Mono" font-size="10.5" fill="#4B525A">
								RANDOM: $679.37
							</text>
						</svg>
						<div class="font-mono-tech text-xs text-[var(--ink-muted)]">
							{activeStage.metricLabel} | {activeStage.metricValue}
						</div>
					</div>
				{:else}
					<div class="border border-[var(--ink)] bg-[var(--vitrine)] p-6 text-[var(--vitrine-ink)]">
						<div class="flex items-center justify-between border-b border-slate-700 pb-3 font-mono-tech text-xs">
							<span class="font-semibold text-[#F3F4F6] uppercase">{activeStage.title}</span>
							<span class="text-[var(--vitrine-ok)]">{activeStage.step}</span>
						</div>
						<svg viewBox="0 0 560 320" class="my-5 h-auto w-full border border-slate-700 bg-[var(--vitrine-panel)] p-3" role="img" aria-label="EquiSentinel streaming and Airflow DAG architecture">
							<line x1="145" y1="95" x2="220" y2="95" stroke="#7FD4C2" stroke-width="2" />
							<line x1="340" y1="95" x2="415" y2="95" stroke="#E8A394" stroke-width="2" />
							<line x1="280" y1="130" x2="280" y2="195" stroke="#A3AEBC" stroke-width="1.5" stroke-dasharray="4 4" />
							<rect x="25" y="62" width="120" height="66" fill="#1E242C" stroke="#7FD4C2" />
							<text x="42" y="92" font-family="JetBrains Mono" font-size="11" fill="#E5E7EB">NATS / Go</text>
							<text x="42" y="110" font-family="JetBrains Mono" font-size="10" fill="#7FD4C2">&gt;3% / &gt;5x Vol</text>
							<rect x="220" y="62" width="120" height="66" fill="#1E242C" stroke="#E8A394" />
							<text x="234" y="92" font-family="JetBrains Mono" font-size="11" fill="#E5E7EB">LangGraph</text>
							<text x="234" y="110" font-family="JetBrains Mono" font-size="10" fill="#E8A394">5-Stage Worker</text>
							<rect x="415" y="62" width="120" height="66" fill="#1E242C" stroke="#A3AEBC" />
							<text x="430" y="92" font-family="JetBrains Mono" font-size="11" fill="#E5E7EB">TimescaleDB</text>
							<text x="430" y="110" font-family="JetBrains Mono" font-size="10" fill="#A3AEBC">+ Redis 5m</text>
							<rect x="115" y="195" width="330" height="64" fill="#1E242C" stroke="#64748B" />
							<text x="145" y="224" font-family="JetBrains Mono" font-size="11" fill="#E5E7EB">
								4 Apache Airflow ETL DAGs (1m / 5m / 1h)
							</text>
							<text x="165" y="244" font-family="JetBrains Mono" font-size="10" fill="#7FD4C2">
								SMA / EMA / RSI / Bollinger + feature_store_ai
							</text>
						</svg>
						<div class="font-mono-tech text-xs text-[var(--vitrine-muted)]">
							{activeStage.metricLabel} | {activeStage.metricValue}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>
