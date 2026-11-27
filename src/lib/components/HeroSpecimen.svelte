<script lang="ts">
	import NeuralCanvas from '$lib/components/NeuralCanvas.svelte';
	import { PROFILE } from '$lib/data/portfolio';
	import { PORTFOLIO_GRAPH_NODES, type GraphNodeDef } from '$lib/utils/graph3d';

	interface Props {
		onSelectNode?: (node: GraphNodeDef) => void;
	}

	let { onSelectNode }: Props = $props();

	let hoveredNode = $state<GraphNodeDef | null>(null);

	const activeInspectorNode = $derived(hoveredNode ?? PORTFOLIO_GRAPH_NODES[1]);
</script>

<section id="top" class="border-b border-[var(--rule)] bg-[var(--bg-bone)]">
	<div class="grid w-full grid-cols-1 items-center gap-8 px-6 py-12 sm:px-10 sm:py-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 lg:px-14 lg:py-16 xl:px-20">
		<div class="flex flex-col justify-center">
			<h1
				class="hero-reveal font-display text-5xl leading-[0.95] font-extrabold tracking-[-0.035em] text-[var(--ink)] sm:text-6xl xl:text-[74px]"
			>
				Fahmi<br />Haqqul<br />Ihsan
			</h1>
			<p
				style="animation-delay: 80ms"
				class="hero-reveal mt-6 max-w-[58ch] text-lg leading-relaxed text-[var(--ink-muted)] sm:text-[19px]"
			>
				{PROFILE.bio}
			</p>
			<div style="animation-delay: 140ms" class="hero-reveal mt-8">
				<a
					href="#projects"
					class="font-mono-tech inline-block rounded-full bg-[var(--vermilion)] px-6 py-3 text-xs font-semibold text-[var(--bg-plate)] shadow-[0_10px_24px_-12px_rgba(184,56,30,0.6)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#9A2D16] active:scale-[0.98]"
				>
					Explore All Projects
				</a>
			</div>
		</div>

		<!-- Borderless 3D interactive portfolio constellation floating cleanly over bone background -->
		<div style="animation-delay: 110ms" class="hero-reveal flex flex-col">
			<NeuralCanvas
				onHoverNode={(node) => (hoveredNode = node)}
				{onSelectNode}
			/>

			{#key activeInspectorNode.id}
				<div class="panel-swap-enter border-t border-[var(--rule)] pt-3">
					<div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
						<span class="font-mono-tech text-xs font-semibold text-[var(--ink)]">
							{activeInspectorNode.label}
						</span>
						<span class="font-mono-tech text-[11px] font-medium text-[var(--teal)]">
							{activeInspectorNode.metric}
						</span>
					</div>
					<div class="mt-0.5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-xs text-[var(--ink-muted)]">
						<span>{activeInspectorNode.roleNote}</span>
						<span class="font-mono-tech hidden text-[11px] text-[var(--ink-muted)]/80 sm:inline">
							Drag to orbit · Click node
						</span>
					</div>
				</div>
			{/key}
		</div>
	</div>
</section>
