<script lang="ts">
	import type { ProjectMediaSpec } from '$lib/data/portfolio';

	interface Props {
		variant: 'conformal' | 'causal' | 'equisentinel' | 'tabular' | 'glzr' | 'trello' | 'api' | 'web';
		title: string;
		media?: ProjectMediaSpec;
	}

	let { variant, title, media }: Props = $props();
</script>

{#if media?.type === 'video'}
	<video
		src={media.src}
		poster={media.poster}
		aria-label={media.alt}
		autoplay
		loop
		muted
		playsinline
		class="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]"
	></video>
{:else if media?.type === 'image'}
	<img
		src={media.src}
		alt={media.alt}
		loading="lazy"
		class="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]"
	/>
{:else}
	<!-- Clean bespoke dark showcase fallback until real project screenshot or video demo is attached -->
	<div class="flex h-full w-full items-center justify-center bg-[var(--vitrine)] p-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]">
		{#if variant === 'conformal'}
			<svg viewBox="0 0 400 230" class="h-full w-full" role="img" aria-label={title}>
				<line x1="36" y1="190" x2="368" y2="190" stroke="#475569" stroke-width="1" />
				<path d="M 36 184 C 130 162, 230 100, 360 56 L 360 36 C 235 76, 135 138, 36 164 Z" fill="#7FD4C2" fill-opacity="0.16" />
				<path d="M 36 188 C 140 144, 240 82, 360 46" fill="none" stroke="#7FD4C2" stroke-width="2.5" stroke-linecap="round" />
				<path d="M 36 188 C 145 156, 245 130, 360 124" fill="none" stroke="#E8A394" stroke-width="2" stroke-dasharray="4 3" />
				<circle cx="360" cy="46" r="5" fill="#7FD4C2" />
				<text x="36" y="28" font-family="JetBrains Mono" font-size="10" fill="#A3AEBC">alpha 0.05 · 1.96% FAR · 96.14% Quality</text>
			</svg>
		{:else if variant === 'causal'}
			<svg viewBox="0 0 400 230" class="h-full w-full" role="img" aria-label={title}>
				<rect x="44" y="130" width="68" height="62" rx="6" fill="#475569" fill-opacity="0.55" />
				<rect x="164" y="96" width="68" height="96" rx="6" fill="#E8A394" fill-opacity="0.75" />
				<rect x="284" y="48" width="68" height="144" rx="6" fill="#7FD4C2" />
				<text x="78" y="210" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" fill="#A3AEBC">$679 Random</text>
				<text x="198" y="210" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" fill="#E8A394">$1,529 Naive</text>
				<text x="318" y="210" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" fill="#7FD4C2">$2,679 DR</text>
			</svg>
		{:else if variant === 'equisentinel'}
			<svg viewBox="0 0 400 230" class="h-full w-full" role="img" aria-label={title}>
				<polyline
					points="24,148 74,136 112,142 152,110 184,122 222,64 258,92 302,78 340,46 376,68"
					fill="none"
					stroke="#7FD4C2"
					stroke-width="2.4"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<circle cx="222" cy="64" r="7" fill="none" stroke="#E8A394" stroke-width="2" />
				<circle cx="222" cy="64" r="3.2" fill="#E8A394" />
				<text x="24" y="30" font-family="JetBrains Mono" font-size="10" fill="#A3AEBC">NATS JetStream · LangGraph · 4 Airflow DAGs</text>
			</svg>
		{:else if variant === 'tabular'}
			<svg viewBox="0 0 400 230" class="h-full w-full" role="img" aria-label={title}>
				<rect x="34" y="42" width="100" height="44" rx="8" fill="#262E38" />
				<rect x="150" y="42" width="100" height="44" rx="8" fill="#262E38" />
				<rect x="266" y="42" width="100" height="44" rx="8" fill="#262E38" />
				<text x="84" y="68" text-anchor="middle" font-family="JetBrains Mono" font-size="10" fill="#F1F5F9">LightGBM</text>
				<text x="200" y="68" text-anchor="middle" font-family="JetBrains Mono" font-size="10" fill="#F1F5F9">XGBoost</text>
				<text x="316" y="68" text-anchor="middle" font-family="JetBrains Mono" font-size="10" fill="#F1F5F9">CatBoost</text>
				<rect x="34" y="114" width="332" height="72" rx="10" fill="#262E38" />
				<text x="200" y="146" text-anchor="middle" font-family="JetBrains Mono" font-size="10.5" fill="#7FD4C2">Parquet + MLflow Runs + pytest Gate</text>
				<text x="200" y="168" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" fill="#A3AEBC">Reproducible End-to-End Ensemble Training</text>
			</svg>
		{:else if variant === 'glzr'}
			<svg viewBox="0 0 400 230" class="h-full w-full" role="img" aria-label={title}>
				<rect x="28" y="30" width="166" height="170" rx="8" fill="#262E38" />
				<rect x="206" y="30" width="166" height="80" rx="8" fill="#262E38" />
				<rect x="206" y="120" width="166" height="80" rx="8" fill="#262E38" />
				<text x="46" y="58" font-family="JetBrains Mono" font-size="10" fill="#7FD4C2">$ glzr session</text>
				<text x="46" y="80" font-family="JetBrains Mono" font-size="9.5" fill="#A3AEBC">workspace: dev-ai</text>
				<text x="224" y="62" font-family="JetBrains Mono" font-size="9.5" fill="#F1F5F9">pane 01 · nvim</text>
				<text x="224" y="152" font-family="JetBrains Mono" font-size="9.5" fill="#E8A394">pane 02 · logs</text>
			</svg>
		{:else if variant === 'trello'}
			<svg viewBox="0 0 400 230" class="h-full w-full" role="img" aria-label={title}>
				<rect x="28" y="34" width="106" height="162" rx="8" fill="#262E38" />
				<rect x="147" y="34" width="106" height="162" rx="8" fill="#262E38" />
				<rect x="266" y="34" width="106" height="162" rx="8" fill="#262E38" />
				<text x="42" y="58" font-family="JetBrains Mono" font-size="9.5" fill="#A3AEBC">Backlog</text>
				<text x="161" y="58" font-family="JetBrains Mono" font-size="9.5" fill="#E8A394">In Progress</text>
				<text x="280" y="58" font-family="JetBrains Mono" font-size="9.5" fill="#7FD4C2">Done</text>
				<rect x="40" y="74" width="82" height="24" rx="5" fill="#1E242C" />
				<rect x="159" y="74" width="82" height="24" rx="5" fill="#1E242C" />
				<rect x="278" y="74" width="82" height="24" rx="5" fill="#1E242C" />
			</svg>
		{:else if variant === 'api'}
			<svg viewBox="0 0 400 230" class="h-full w-full" role="img" aria-label={title}>
				<rect x="32" y="38" width="336" height="44" rx="8" fill="#262E38" />
				<rect x="32" y="94" width="336" height="44" rx="8" fill="#262E38" />
				<rect x="32" y="150" width="336" height="44" rx="8" fill="#262E38" />
				<text x="52" y="64" font-family="JetBrains Mono" font-size="10" fill="#7FD4C2">GET  /api/v1/appointments</text>
				<text x="52" y="120" font-family="JetBrains Mono" font-size="10" fill="#F1F5F9">POST /api/v1/treatments</text>
				<text x="52" y="176" font-family="JetBrains Mono" font-size="10" fill="#A3AEBC">OPENAPI  /docs/scramble</text>
			</svg>
		{:else}
			<svg viewBox="0 0 400 230" class="h-full w-full" role="img" aria-label={title}>
				<rect x="40" y="28" width="320" height="174" rx="12" fill="#262E38" />
				<rect x="66" y="54" width="124" height="92" rx="8" fill="#1E242C" />
				<rect x="210" y="54" width="124" height="92" rx="8" fill="#1E242C" />
				<circle cx="200" cy="176" r="10" fill="#E8A394" />
				<text x="200" y="106" text-anchor="middle" font-family="JetBrains Mono" font-size="9.5" fill="#7FD4C2">LIVE CAPTURE</text>
			</svg>
		{/if}
	</div>
{/if}
