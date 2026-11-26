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
	<div class="specimen-dot-grid border-b border-[var(--rule)] px-4 py-3">
		<div class="flex flex-wrap items-center justify-between gap-2">
			<span class="font-mono-tech text-[11px] font-semibold text-[var(--teal)]">
				{stats.falseAcceptRate} FAR ({stats.alphaLabel}) | 96.14% Quality (-8.50% Cost)
			</span>
			<button
				type="button"
				onclick={() => (alpha = toggleConformalAlpha(alpha))}
				aria-pressed={alpha === 0.05}
				class="font-mono-tech border border-[var(--ink)] bg-[var(--bg-plate)] px-2 py-0.5 text-[11px] font-medium text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-[var(--bg-plate)]"
			>
				alpha={alpha === 0.1 ? '0.05' : '0.10'}
			</button>
		</div>
	</div>
{:else if variant === 'causal'}
	<div class="specimen-dot-grid border-b border-[var(--rule)] px-4 py-3">
		<div class="font-mono-tech flex flex-wrap items-center justify-between gap-2 text-[11px]">
			<span class="font-semibold text-[var(--teal)]">DR-Learner $2,679.37 (+75%)</span>
			<span class="text-[var(--ink-muted)]">Qini 0.0368 | Hillstrom n=64k</span>
		</div>
	</div>
{:else if variant === 'equisentinel'}
	<div class="border-b border-[var(--rule)] bg-[var(--vitrine)] px-4 py-3 text-[var(--vitrine-ink)]">
		<div class="font-mono-tech flex flex-wrap items-center justify-between gap-2 text-[11px]">
			<span class="font-semibold text-[var(--vitrine-ok)]">Go NATS / 5-Stage LangGraph / Airflow</span>
			<span class="text-[var(--vitrine-alert)]">&gt;3% Price / &gt;5x Vol</span>
		</div>
	</div>
{:else if variant === 'tabular'}
	<div class="specimen-dot-grid border-b border-[var(--rule)] px-4 py-3">
		<div class="font-mono-tech flex flex-wrap items-center justify-between gap-2 text-[11px] text-[var(--ink-muted)]">
			<span class="font-semibold text-[var(--teal)]">Parquet | LightGBM / XGBoost / CatBoost</span>
			<span>MLflow + pytest</span>
		</div>
	</div>
{:else if variant === 'glzr'}
	<div class="border-b border-[var(--rule)] bg-[var(--vitrine)] px-4 py-3 text-[var(--vitrine-ink)]">
		<div class="font-mono-tech flex flex-wrap items-center justify-between gap-2 text-[11px]">
			<span class="text-[var(--vitrine-ok)]">workspace // linux-tty</span>
			<span class="text-[var(--vitrine-muted)]">Svelte Linux Workspace</span>
		</div>
	</div>
{:else if variant === 'trello'}
	<div class="border-b border-[var(--rule)] bg-[var(--vitrine)] px-4 py-3 text-[var(--vitrine-ink)]">
		<div class="font-mono-tech flex flex-wrap items-center justify-between gap-2 text-[11px]">
			<span class="text-[var(--vitrine-ok)]">tui // [todo] [doing] [done]</span>
			<span class="text-[var(--vitrine-muted)]">TypeScript + Ink</span>
		</div>
	</div>
{:else if variant === 'api'}
	<div class="border-b border-[var(--rule)] bg-[var(--bg-bone)] px-4 py-3">
		<div class="font-mono-tech flex flex-wrap items-center justify-between gap-2 text-[11px] text-[var(--ink-muted)]">
			<span>REST API // Scramble OpenAPI</span>
			<span class="text-[var(--teal)]">PHP / Laravel</span>
		</div>
	</div>
{:else}
	<div class="border-b border-[var(--rule)] bg-[var(--bg-bone)] px-4 py-3">
		<div class="font-mono-tech flex flex-wrap items-center justify-between gap-2 text-[11px] text-[var(--ink-muted)]">
			<span>Browser Canvas // Photobooth</span>
			<span class="text-[var(--teal)]">Live Deployment</span>
		</div>
	</div>
{/if}
