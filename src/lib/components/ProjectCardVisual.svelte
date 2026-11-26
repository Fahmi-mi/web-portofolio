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
	<div class="font-mono-tech flex flex-wrap items-center justify-between gap-2 border-b border-[var(--rule)] px-6 py-2.5 text-[11px] sm:px-7">
		<span class="font-semibold text-[var(--teal)]">
			{stats.falseAcceptRate} FAR ({stats.alphaLabel}) | 96.14% Quality (-8.50% Cost)
		</span>
		<button
			type="button"
			onclick={() => (alpha = toggleConformalAlpha(alpha))}
			aria-pressed={alpha === 0.05}
			class="font-mono-tech border border-[var(--rule)] bg-[var(--bg-bone)] px-2 py-0.5 text-[11px] font-medium text-[var(--ink)] transition-colors hover:border-[var(--ink)]"
		>
			alpha={alpha === 0.1 ? '0.05' : '0.10'}
		</button>
	</div>
{:else if variant === 'causal'}
	<div class="font-mono-tech flex flex-wrap items-center justify-between gap-2 border-b border-[var(--rule)] px-6 py-2.5 text-[11px] sm:px-7">
		<span class="font-semibold text-[var(--teal)]">DR-Learner $2,679.37 (+75%)</span>
		<span class="text-[var(--ink-muted)]">Qini 0.0368 | Hillstrom n=64k</span>
	</div>
{:else if variant === 'equisentinel'}
	<div class="font-mono-tech flex flex-wrap items-center justify-between gap-2 border-b border-[var(--rule)] px-6 py-2.5 text-[11px] sm:px-7">
		<span class="font-semibold text-[var(--teal)]">Go NATS / 5-Stage LangGraph / Airflow</span>
		<span class="text-[var(--vermilion)]">&gt;3% Price / &gt;5x Vol</span>
	</div>
{:else if variant === 'tabular'}
	<div class="font-mono-tech flex flex-wrap items-center justify-between gap-2 border-b border-[var(--rule)] px-6 py-2.5 text-[11px] sm:px-7">
		<span class="font-semibold text-[var(--teal)]">Parquet | LightGBM / XGBoost / CatBoost</span>
		<span class="text-[var(--ink-muted)]">MLflow + pytest</span>
	</div>
{:else if variant === 'glzr'}
	<div class="font-mono-tech flex flex-wrap items-center justify-between gap-2 border-b border-[var(--rule)] px-6 py-2.5 text-[11px] sm:px-7">
		<span class="font-semibold text-[var(--ink)]">Linux Tiling Workspace</span>
		<span class="text-[var(--ink-muted)]">Svelte Open Source</span>
	</div>
{:else if variant === 'trello'}
	<div class="font-mono-tech flex flex-wrap items-center justify-between gap-2 border-b border-[var(--rule)] px-6 py-2.5 text-[11px] sm:px-7">
		<span class="font-semibold text-[var(--ink)]">Terminal Kanban TUI</span>
		<span class="text-[var(--ink-muted)]">TypeScript + Ink</span>
	</div>
{:else if variant === 'api'}
	<div class="font-mono-tech flex flex-wrap items-center justify-between gap-2 border-b border-[var(--rule)] px-6 py-2.5 text-[11px] sm:px-7">
		<span class="font-semibold text-[var(--ink)]">Clinic CMS &amp; REST API</span>
		<span class="text-[var(--ink-muted)]">Laravel + Scramble OpenAPI</span>
	</div>
{:else}
	<div class="font-mono-tech flex flex-wrap items-center justify-between gap-2 border-b border-[var(--rule)] px-6 py-2.5 text-[11px] sm:px-7">
		<span class="font-semibold text-[var(--ink)]">Browser Photobooth</span>
		<span class="text-[var(--vermilion)]">Live Web Deployment</span>
	</div>
{/if}
