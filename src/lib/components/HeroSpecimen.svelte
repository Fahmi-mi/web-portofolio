<script lang="ts">
	import NeuralCanvas from '$lib/components/NeuralCanvas.svelte';
	import { PROFILE } from '$lib/data/portfolio';
	import { PORTFOLIO_GRAPH_NODES, type GraphNodeDef } from '$lib/utils/graph3d';

	interface Props {
		onSelectNode?: (node: GraphNodeDef) => void;
	}

	let { onSelectNode }: Props = $props();

	let hoveredNode = $state<GraphNodeDef | null>(null);
	let ambientPos = $state({ x: 58, y: 42 });

	const activeInspectorNode = $derived(hoveredNode ?? PORTFOLIO_GRAPH_NODES[1]);

	function handleWindowMove(event: PointerEvent) {
		if (event.clientY > window.innerHeight) return;
		const px = Math.round((event.clientX / Math.max(1, window.innerWidth)) * 100);
		const py = Math.round((event.clientY / Math.max(1, window.innerHeight)) * 100);
		ambientPos = { x: px, y: py };
	}
</script>

<svelte:window onpointermove={handleWindowMove} />

<section
	id="top"
	class="relative overflow-hidden bg-[var(--bg-bone)] pt-4 pb-12 sm:pt-6 sm:pb-16 lg:pb-20"
>
	<!-- Subtle latent-space light field so floating 3D graph and Liquid Glass refract real depth -->
	<div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
		<div
			class="latent-orb absolute -top-24 right-[-6%] h-[420px] w-[420px] rounded-full opacity-55 blur-3xl transition-transform duration-700"
			style={`background: radial-gradient(circle, rgba(15, 118, 110, 0.22), rgba(127, 212, 194, 0.08) 55%, transparent 72%); transform: translate3d(${(ambientPos.x - 50) * 0.18}px, ${(ambientPos.y - 50) * 0.14}px, 0);`}
		></div>
		<div
			class="latent-orb absolute bottom-[-8%] right-[16%] h-[340px] w-[340px] rounded-full opacity-45 blur-3xl transition-transform duration-700"
			style={`animation-delay: -5s; background: radial-gradient(circle, rgba(184, 56, 30, 0.16), transparent 68%); transform: translate3d(${(50 - ambientPos.x) * 0.14}px, ${(50 - ambientPos.y) * 0.12}px, 0);`}
		></div>
	</div>

	<div class="relative grid w-full grid-cols-1 items-center gap-8 px-6 py-6 sm:px-10 lg:grid-cols-[0.94fr_1.06fr] lg:gap-10 lg:px-14 lg:py-10 xl:px-20">
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
					class="font-mono-tech inline-block rounded-full bg-[var(--vermilion)] px-6 py-3 text-xs font-semibold text-[var(--bg-plate)] shadow-[0_12px_26px_-12px_rgba(184,56,30,0.65)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#9A2D16] active:scale-[0.98]"
				>
					Explore All Projects
				</a>
			</div>
		</div>

		<!-- Borderless 3D Constellation intersecting softly with overlapping Liquid Glass AI Inspector -->
		<div style="animation-delay: 110ms" class="hero-reveal relative flex flex-col">
			<NeuralCanvas
				onHoverNode={(node) => (hoveredNode = node)}
				{onSelectNode}
			/>

			{#key activeInspectorNode.id}
				<div class="liquid-glass-light panel-swap-enter relative z-10 -mt-9 mx-1 rounded-2xl px-5 py-3.5 sm:mx-4">
					<div class="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
						<div class="flex items-center gap-2">
							<span class="h-2 w-2 rounded-full bg-[var(--teal)]" aria-hidden="true"></span>
							<span class="font-mono-tech text-xs font-semibold text-[var(--ink)]">
								{activeInspectorNode.label}
							</span>
						</div>
						<span class="font-mono-tech text-[11px] font-semibold text-[var(--teal)]">
							{activeInspectorNode.metric}
						</span>
					</div>
					<div class="mt-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-xs text-[var(--ink-muted)]">
						<span>{activeInspectorNode.roleNote}</span>
						<span class="font-mono-tech hidden text-[11px] text-[var(--ink-muted)]/85 sm:inline">
							Drag to orbit · Click node
						</span>
					</div>
				</div>
			{/key}
		</div>
	</div>
</section>
