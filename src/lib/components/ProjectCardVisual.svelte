<script lang="ts">
	import { getConformalStats, type ConformalAlpha } from '$lib/data/portfolio';
	import { toggleConformalAlpha } from '$lib/utils/interactions';

	interface Props {
		variant:
			| 'conformal'
			| 'causal'
			| 'equisentinel'
			| 'tabular'
			| 'glzr'
			| 'trello'
			| 'api'
			| 'web';
	}

	let { variant }: Props = $props();
	let alpha = $state<ConformalAlpha>(0.1);
	const stats = $derived(getConformalStats(alpha));
</script>

{#if variant === 'conformal'}
	<div class="specimen-dot-grid border-b border-[var(--rule)] p-4">
		<div class="mb-2.5 flex flex-wrap items-center justify-between gap-2">
			<span class="font-mono-tech text-[11px] font-semibold text-[var(--teal)] uppercase">
				RAGTruth False-Accept ({stats.alphaLabel})
			</span>
			<button
				type="button"
				onclick={() => (alpha = toggleConformalAlpha(alpha))}
				aria-pressed={alpha === 0.05}
				class="font-mono-tech border border-[var(--ink)] bg-[var(--bg-plate)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-[var(--bg-plate)]"
			>
				Switch to {alpha === 0.1 ? '0.05' : '0.10'}
			</button>
		</div>
		<svg viewBox="0 0 360 132" class="h-auto w-full" role="img" aria-label="RAGTruth conformal false-accept comparison">
			<line x1="16" y1="108" x2="344" y2="108" stroke="#111317" stroke-width="1.2" />
			<rect x="24" y="20" width="94" height="88" fill="#D8D4CA" />
			<text x="24" y="14" font-family="JetBrains Mono" font-size="10" fill="#4B525A">
				13.52% Heuristic
			</text>

			<rect
				x="146"
				y={108 - stats.bandHeight}
				width="94"
				height={stats.bandHeight}
				fill="#0F766E"
			/>
			<text
				x="146"
				y={102 - stats.bandHeight}
				font-family="JetBrains Mono"
				font-size="10.5"
				font-weight="600"
				fill="#0F766E"
			>
				{stats.falseAcceptRate} Conformal
			</text>

			<rect x="262" y="28" width="82" height="80" fill="#FAF9F5" stroke="#111317" stroke-width="1" />
			<text x="270" y="54" font-family="JetBrains Mono" font-size="9.5" fill="#111317">
				RouterBench
			</text>
			<text x="270" y="72" font-family="JetBrains Mono" font-size="11" font-weight="700" fill="#0F766E">
				96.14% Qual
			</text>
			<text x="270" y="88" font-family="JetBrains Mono" font-size="9.5" fill="#D9482B">
				-8.50% Cost
			</text>
		</svg>
		<div class="font-mono-tech mt-1 text-[11px] text-[var(--ink-muted)]">
			{stats.reductionDelta} | Brier 0.1734
		</div>
	</div>
{:else if variant === 'causal'}
	<div class="specimen-dot-grid border-b border-[var(--rule)] p-4">
		<div class="mb-2.5 flex flex-wrap items-center justify-between gap-2">
			<span class="font-mono-tech text-[11px] font-semibold text-[var(--teal)] uppercase">
				Hillstrom RCT Net Profit ($2,500 Budget)
			</span>
			<span class="font-mono-tech text-[11px] text-[var(--ink-muted)]">Qini 0.0368</span>
		</div>
		<svg viewBox="0 0 360 132" class="h-auto w-full" role="img" aria-label="Causal uplift net profit comparison across policies">
			<rect x="16" y="14" width="256" height="24" fill="#0F766E" />
			<text x="24" y="30" font-family="JetBrains Mono" font-size="10.5" fill="#FAF9F5">
				DR-Learner: $2,679.37 (+75%)
			</text>

			<rect x="16" y="52" width="146" height="24" fill="#D9482B" />
			<text x="170" y="68" font-family="JetBrains Mono" font-size="10.5" fill="#111317">
				Propensity: $1,529.02
			</text>

			<rect x="16" y="90" width="66" height="24" fill="#CFCAC0" />
			<text x="90" y="106" font-family="JetBrains Mono" font-size="10.5" fill="#4B525A">
				Random: $679.37
			</text>
		</svg>
		<div class="font-mono-tech mt-1 text-[11px] text-[var(--ink-muted)]">
			DR-Learner AUUC 0.0213 | Hillstrom n=64,000
		</div>
	</div>
{:else if variant === 'equisentinel'}
	<div class="border-b border-[var(--rule)] bg-[var(--vitrine)] p-4 text-[var(--vitrine-ink)]">
		<div class="mb-2.5 flex flex-wrap items-center justify-between gap-2">
			<span class="font-mono-tech text-[11px] font-semibold text-[var(--vitrine-ok)] uppercase">
				Isolated Telemetry Vitrine
			</span>
			<span class="font-mono-tech text-[11px] text-[var(--vitrine-alert)]">
				&gt;3% Price / &gt;5x Vol
			</span>
		</div>
		<svg viewBox="0 0 360 132" class="h-auto w-full" role="img" aria-label="EquiSentinel streaming architecture schematic">
			<line x1="94" y1="38" x2="132" y2="38" stroke="#34D399" stroke-width="1.8" />
			<line x1="228" y1="38" x2="266" y2="38" stroke="#F87171" stroke-width="1.8" />
			<line x1="180" y1="58" x2="180" y2="82" stroke="#9CA3AF" stroke-width="1.5" stroke-dasharray="3 3" />

			<rect x="12" y="18" width="82" height="40" fill="#1A1F29" stroke="#34D399" />
			<text x="20" y="36" font-family="JetBrains Mono" font-size="9.5" fill="#E6EAF0">NATS / Go</text>
			<text x="20" y="50" font-family="JetBrains Mono" font-size="8.5" fill="#34D399">Protobuf</text>

			<rect x="132" y="18" width="96" height="40" fill="#1A1F29" stroke="#F87171" />
			<text x="140" y="36" font-family="JetBrains Mono" font-size="9.5" fill="#E6EAF0">LangGraph</text>
			<text x="140" y="50" font-family="JetBrains Mono" font-size="8.5" fill="#F87171">5-Stage AI</text>

			<rect x="266" y="18" width="82" height="40" fill="#1A1F29" stroke="#9CA3AF" />
			<text x="274" y="36" font-family="JetBrains Mono" font-size="9.5" fill="#E6EAF0">TimescaleDB</text>
			<text x="274" y="50" font-family="JetBrains Mono" font-size="8.5" fill="#9CA3AF">+ Redis 5m</text>

			<rect x="76" y="82" width="208" height="34" fill="#1A1F29" stroke="#4B525A" />
			<text x="88" y="103" font-family="JetBrains Mono" font-size="9.5" fill="#E6EAF0">
				4 Airflow DAGs: 1m / 5m / 1h OHLCV
			</text>
		</svg>
		<div class="font-mono-tech mt-1 text-[11px] text-[var(--vitrine-muted)]">
			DeepSeek + Pydantic + HITL feedback loop
		</div>
	</div>
{:else if variant === 'tabular'}
	<div class="border-b border-[var(--rule)] bg-[var(--bg-bone)] px-4 py-3">
		<div class="font-mono-tech flex items-center justify-between text-[11px] text-[var(--ink-muted)]">
			<span>Parquet | LightGBM / XGBoost / CatBoost</span>
			<span class="text-[var(--teal)]">MLflow + pytest</span>
		</div>
	</div>
{:else if variant === 'glzr'}
	<div class="border-b border-[var(--rule)] bg-[var(--vitrine)] px-4 py-3 text-[var(--vitrine-ink)]">
		<div class="font-mono-tech flex items-center justify-between text-[11px]">
			<span class="text-[var(--vitrine-ok)]">workspace // linux-tty</span>
			<span class="text-[var(--vitrine-muted)]">Svelte Tiling Shell</span>
		</div>
	</div>
{:else if variant === 'trello'}
	<div class="border-b border-[var(--rule)] bg-[var(--vitrine)] px-4 py-3 text-[var(--vitrine-ink)]">
		<div class="font-mono-tech flex items-center justify-between text-[11px]">
			<span class="text-[var(--vitrine-ok)]">tui // [todo] [doing] [done]</span>
			<span class="text-[var(--vitrine-muted)]">TypeScript + Ink</span>
		</div>
	</div>
{:else if variant === 'api'}
	<div class="border-b border-[var(--rule)] bg-[var(--bg-bone)] px-4 py-3">
		<div class="font-mono-tech flex items-center justify-between text-[11px] text-[var(--ink-muted)]">
			<span>REST API // Scramble OpenAPI</span>
			<span class="text-[var(--teal)]">PHP / Laravel</span>
		</div>
	</div>
{:else}
	<div class="border-b border-[var(--rule)] bg-[var(--bg-bone)] px-4 py-3">
		<div class="font-mono-tech flex items-center justify-between text-[11px] text-[var(--ink-muted)]">
			<span>Browser Canvas // Photobooth</span>
			<span class="text-[var(--teal)]">Live Deployment</span>
		</div>
	</div>
{/if}
