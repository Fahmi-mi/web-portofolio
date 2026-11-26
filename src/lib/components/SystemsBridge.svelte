<script lang="ts">
	import { onMount } from 'svelte';
	import {
		LEADERSHIP_ITEM,
		PROFILE,
		SYSTEM_BRIDGE_EDGES,
		SYSTEM_BRIDGE_NODES
	} from '$lib/data/portfolio';
	import {
		computeBipartitePath,
		getConnectedEdges,
		resolveBridgeSelection
	} from '$lib/utils/interactions';

	let pinnedNodeId = $state<string | null>('conformal');
	let hoveredNodeId = $state<string | null>(null);

	let gridContainerEl = $state<HTMLDivElement | null>(null);
	let gapColEl = $state<HTMLDivElement | null>(null);
	let nodeRefs: Record<string, HTMLButtonElement | undefined> = {};

	let svgHeight = $state(280);
	let gapWidth = $state(140);
	let nodeCenters = $state<Record<string, number>>({});

	const mlNodes = SYSTEM_BRIDGE_NODES.filter((node) => node.side === 'ml');
	const systemNodes = SYSTEM_BRIDGE_NODES.filter((node) => node.side === 'system');

	const activeNodeId = $derived(resolveBridgeSelection(pinnedNodeId, hoveredNodeId));
	const activeEdges = $derived(getConnectedEdges(activeNodeId, SYSTEM_BRIDGE_EDGES));
	const activeNode = $derived(
		SYSTEM_BRIDGE_NODES.find((node) => node.id === activeNodeId) ?? null
	);

	function isEdgeActive(from: string, to: string): boolean {
		return activeEdges.some((edge) => edge.from === from && edge.to === to);
	}

	function togglePin(nodeId: string) {
		pinnedNodeId = pinnedNodeId === nodeId ? null : nodeId;
	}

	function measurePositions() {
		if (!gridContainerEl || !gapColEl) return;
		const containerRect = gridContainerEl.getBoundingClientRect();
		const gapRect = gapColEl.getBoundingClientRect();

		svgHeight = Math.max(220, Math.round(containerRect.height));
		gapWidth = Math.max(80, Math.round(gapRect.width));

		const nextCenters: Record<string, number> = {};
		for (const node of SYSTEM_BRIDGE_NODES) {
			const btn = nodeRefs[node.id];
			if (!btn) continue;
			const rect = btn.getBoundingClientRect();
			nextCenters[node.id] = rect.top - containerRect.top + rect.height / 2;
		}
		nodeCenters = nextCenters;
	}

	onMount(() => {
		measurePositions();
		const ro = new ResizeObserver(() => measurePositions());
		if (gridContainerEl) ro.observe(gridContainerEl);
		window.addEventListener('resize', measurePositions);

		return () => {
			ro.disconnect();
			window.removeEventListener('resize', measurePositions);
		};
	});
</script>

<section id="about" class="border-b border-[var(--rule)] bg-[var(--bg-plate)]">
	<div class="grid w-full grid-cols-1 gap-10 px-6 py-16 sm:px-10 lg:grid-cols-[0.82fr_1.18fr] lg:px-14 lg:py-20 xl:px-20">
		<div class="flex flex-col justify-center">
			<h2 class="font-display text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-4xl">
				About &amp; Engineering Bridge
			</h2>
			<p class="mt-5 max-w-[65ch] text-lg leading-relaxed text-[#2A2E35]">
				I am pursuing a {PROFILE.degree} at {PROFILE.university}, building systems where statistical
				guarantees meet resilient backend execution.
			</p>
			<p class="mt-4 max-w-[65ch] text-base leading-relaxed text-[var(--ink-muted)]">
				Across research benchmarks and production freelance engagements, I pair calibration frameworks
				like MAPIE and EconML with FastAPI, Go, NATS JetStream, Apache Airflow, and Laravel. At
				{LEADERSHIP_ITEM.organization}, I also mentor junior students in practical ML and AI engineering.
			</p>
		</div>

		<div class="border border-[var(--rule)] bg-[var(--bg-bone)] p-5 sm:p-6">
			<div class="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--rule)] pb-3">
				<span class="font-mono-tech text-xs font-semibold tracking-[0.04em] text-[var(--ink)] uppercase">
					ML Rigor to Production Graph
				</span>
				<button
					type="button"
					onclick={() => {
						hoveredNodeId = null;
						pinnedNodeId = pinnedNodeId ? null : 'conformal';
					}}
					class="font-mono-tech border border-[var(--rule)] bg-[var(--bg-plate)] px-2.5 py-1 text-[11px] text-[var(--ink)] uppercase hover:border-[var(--ink)]"
				>
					{pinnedNodeId ? 'Show All Paths' : 'Pin First Node'}
				</button>
			</div>

			<div
				bind:this={gridContainerEl}
				onmouseleave={() => (hoveredNodeId = null)}
				role="region"
				aria-label="Interactive ML to production integration graph"
				class="mt-5 grid grid-cols-1 gap-4 md:grid-cols-[1fr_140px_1fr] md:items-center lg:grid-cols-[1fr_170px_1fr]"
			>
				<div class="space-y-3" role="group" aria-label="ML and AI methodology nodes">
					<div class="font-mono-tech text-[11px] font-semibold tracking-[0.06em] text-[var(--teal)] uppercase">
						Analytical Rigor
					</div>
					{#each mlNodes as node}
						{@const selected = activeNodeId === node.id}
						<button
							bind:this={nodeRefs[node.id]}
							type="button"
							aria-pressed={pinnedNodeId === node.id}
							onmouseenter={() => (hoveredNodeId = node.id)}
							onfocus={() => (hoveredNodeId = node.id)}
							onblur={() => (hoveredNodeId = null)}
							onclick={() => togglePin(node.id)}
							class="w-full border px-3.5 py-3 text-left transition-colors duration-150"
							class:border-[var(--teal)]={selected}
							class:bg-[var(--ink)]={selected}
							class:text-[var(--bg-plate)]={selected}
							class:border-[var(--rule)]={!selected}
							class:bg-[var(--bg-plate)]={!selected}
							class:text-[var(--ink)]={!selected}
						>
							<span class="font-mono-tech block text-xs font-semibold">{node.label}</span>
						</button>
					{/each}
				</div>

				<div bind:this={gapColEl} class="hidden h-full md:block">
					<svg
						viewBox={`0 0 ${gapWidth} ${svgHeight}`}
						class="block h-full w-full overflow-visible"
						aria-hidden="true"
					>
						{#each SYSTEM_BRIDGE_EDGES as edge}
							{@const y1 = nodeCenters[edge.from] ?? svgHeight / 2}
							{@const y2 = nodeCenters[edge.to] ?? svgHeight / 2}
							{@const active = isEdgeActive(edge.from, edge.to)}
							<path
								d={computeBipartitePath(y1, y2, gapWidth)}
								fill="none"
								stroke={active ? '#0F766E' : '#C8C3B8'}
								stroke-width={active ? '2.4' : '1.2'}
								stroke-opacity={active ? '1' : '0.65'}
								class="transition-[stroke,stroke-opacity] duration-200"
							/>
						{/each}
					</svg>
				</div>

				<div class="space-y-2.5" role="group" aria-label="Production runtime nodes">
					<div class="font-mono-tech text-[11px] font-semibold tracking-[0.06em] text-[var(--vermilion)] uppercase">
						Production Runtime
					</div>
					{#each systemNodes as node}
						{@const selected = activeNodeId === node.id}
						<button
							bind:this={nodeRefs[node.id]}
							type="button"
							aria-pressed={pinnedNodeId === node.id}
							onmouseenter={() => (hoveredNodeId = node.id)}
							onfocus={() => (hoveredNodeId = node.id)}
							onblur={() => (hoveredNodeId = null)}
							onclick={() => togglePin(node.id)}
							class="w-full border px-3.5 py-2.5 text-left transition-colors duration-150"
							class:border-[var(--vermilion)]={selected}
							class:bg-[var(--ink)]={selected}
							class:text-[var(--bg-plate)]={selected}
							class:border-[var(--rule)]={!selected}
							class:bg-[var(--bg-plate)]={!selected}
							class:text-[var(--ink)]={!selected}
						>
							<span class="font-mono-tech block text-xs font-semibold">{node.label}</span>
						</button>
					{/each}
				</div>
			</div>

			<div class="mt-5 min-h-[144px] border-t border-[var(--rule)] pt-4">
				{#if activeNode}
					<div class="text-sm font-semibold text-[var(--ink)]">{activeNode.detail}</div>
				{:else}
					<div class="text-sm font-semibold text-[var(--ink)]">
						Showing all {SYSTEM_BRIDGE_EDGES.length} verified ML-to-production integration paths.
					</div>
				{/if}
				<div class="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
					{#each activeEdges.slice(0, 4) as edge}
						<div class="border border-[var(--rule)] bg-[var(--bg-plate)] px-3 py-2">
							<div class="font-mono-tech text-[11px] font-semibold text-[var(--teal)]">
								{edge.project}
							</div>
							<div class="mt-0.5 text-xs text-[var(--ink-muted)]">{edge.proof}</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
