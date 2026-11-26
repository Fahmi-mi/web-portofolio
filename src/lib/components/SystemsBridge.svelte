<script lang="ts">
	import {
		LEADERSHIP_ITEM,
		PROFILE,
		SYSTEM_BRIDGE_EDGES,
		SYSTEM_BRIDGE_NODES
	} from '$lib/data/portfolio';
	import { getConnectedEdges, resolveBridgeSelection } from '$lib/utils/interactions';

	let pinnedNodeId = $state<string | null>('conformal');
	let hoveredNodeId = $state<string | null>(null);

	const mlNodes = SYSTEM_BRIDGE_NODES.filter((node) => node.side === 'ml');
	const systemNodes = SYSTEM_BRIDGE_NODES.filter((node) => node.side === 'system');

	const mlY: Record<string, number> = {
		conformal: 36,
		causal: 102,
		agents: 168,
		'llm-pipeline': 234
	};

	const sysY: Record<string, number> = {
		fastapi: 28,
		duckdb: 80,
		streaming: 132,
		airflow: 184,
		laravel: 236
	};

	const activeNodeId = $derived(resolveBridgeSelection(pinnedNodeId, hoveredNodeId));
	const activeEdges = $derived(getConnectedEdges(activeNodeId, SYSTEM_BRIDGE_EDGES));
	const activeNode = $derived(
		SYSTEM_BRIDGE_NODES.find((node) => node.id === activeNodeId) ?? null
	);

	function isEdgeActive(from: string, to: string): boolean {
		return activeEdges.some((edge) => edge.from === from && edge.to === to);
	}

	function isNodeConnected(nodeId: string): boolean {
		if (!activeNodeId) return true;
		if (activeNodeId === nodeId) return true;
		return activeEdges.some((edge) => edge.from === nodeId || edge.to === nodeId);
	}

	function togglePin(nodeId: string) {
		pinnedNodeId = pinnedNodeId === nodeId ? null : nodeId;
	}
</script>

<section id="about" class="border-b border-[var(--rule)] bg-[var(--bg-plate)]">
	<div class="mx-auto grid max-w-[1360px] grid-cols-1 gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:py-20">
		<div class="flex flex-col justify-between gap-8">
			<div>
				<h2 class="font-display text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-4xl">
					About &amp; Engineering Bridge
				</h2>
				<p class="mt-5 max-w-[65ch] text-lg leading-relaxed text-[#2A2E35]">
					I am pursuing a {PROFILE.degree} at {PROFILE.university} ({PROFILE.studyPeriod}, GPA {PROFILE.gpa}),
					building systems where statistical guarantees meet resilient backend execution.
				</p>
				<p class="mt-4 max-w-[65ch] text-base leading-relaxed text-[var(--ink-muted)]">
					Across research benchmarks and production freelance engagements, I pair calibration frameworks
					like MAPIE and EconML with FastAPI, Go, NATS JetStream, Apache Airflow, and Laravel. At
					{LEADERSHIP_ITEM.organization}, I also mentor junior students in practical ML and AI engineering.
				</p>
			</div>

			<div class="grid grid-cols-1 gap-4 border-t border-[var(--rule)] pt-6 sm:grid-cols-2">
				<div>
					<div class="font-display text-lg font-bold text-[var(--ink)]">
						{PROFILE.primaryRole}
					</div>
					<div class="font-mono-tech mt-0.5 text-[11px] tracking-[0.06em] text-[var(--ink-muted)] uppercase">
						Primary Internship Target
					</div>
				</div>
				<div>
					<div class="font-display text-lg font-bold text-[var(--ink)]">
						{PROFILE.secondaryRole}
					</div>
					<div class="font-mono-tech mt-0.5 text-[11px] tracking-[0.06em] text-[var(--ink-muted)] uppercase">
						Secondary Internship Target
					</div>
				</div>
			</div>
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

			<div class="mt-5 grid grid-cols-1 gap-4 md:grid-cols-[1fr_140px_1fr] md:items-center">
				<div class="space-y-2.5" role="group" aria-label="ML and AI methodology nodes">
					<div class="font-mono-tech text-[11px] font-semibold tracking-[0.06em] text-[var(--teal)] uppercase">
						Analytical Rigor
					</div>
					{#each mlNodes as node}
						{@const connected = isNodeConnected(node.id)}
						{@const selected = activeNodeId === node.id}
						<button
							type="button"
							aria-pressed={pinnedNodeId === node.id}
							onmouseenter={() => (hoveredNodeId = node.id)}
							onmouseleave={() => (hoveredNodeId = null)}
							onfocus={() => (hoveredNodeId = node.id)}
							onblur={() => (hoveredNodeId = null)}
							onclick={() => togglePin(node.id)}
							class="w-full border px-3.5 py-2.5 text-left transition-colors"
							class:border-[var(--teal)]={selected}
							class:bg-[var(--ink)]={selected}
							class:text-[var(--bg-plate)]={selected}
							class:border-[var(--rule)]={!selected}
							class:bg-[var(--bg-plate)]={!selected && connected}
							class:bg-[var(--bg-bone)]={!selected && !connected}
							class:text-[var(--ink)]={!selected && connected}
							class:text-[var(--ink-muted)]={!selected && !connected}
						>
							<span class="font-mono-tech block text-xs font-semibold">{node.label}</span>
						</button>
					{/each}
				</div>

				<div class="hidden md:block">
					<svg viewBox="0 0 140 264" class="h-[248px] w-full" aria-hidden="true">
						{#each SYSTEM_BRIDGE_EDGES as edge}
							{@const y1 = mlY[edge.from] ?? 132}
							{@const y2 = sysY[edge.to] ?? 132}
							{@const active = isEdgeActive(edge.from, edge.to)}
							<path
								d="M 4 {y1} C 68 {y1}, 72 {y2}, 136 {y2}"
								fill="none"
								stroke={active ? '#0F766E' : '#CFCAC0'}
								stroke-width={active ? '2.5' : '1.2'}
								stroke-opacity={active ? '1' : '0.65'}
							/>
						{/each}
					</svg>
				</div>

				<div class="space-y-2" role="group" aria-label="Production runtime nodes">
					<div class="font-mono-tech text-[11px] font-semibold tracking-[0.06em] text-[var(--vermilion)] uppercase">
						Production Runtime
					</div>
					{#each systemNodes as node}
						{@const connected = isNodeConnected(node.id)}
						{@const selected = activeNodeId === node.id}
						<button
							type="button"
							aria-pressed={pinnedNodeId === node.id}
							onmouseenter={() => (hoveredNodeId = node.id)}
							onmouseleave={() => (hoveredNodeId = null)}
							onfocus={() => (hoveredNodeId = node.id)}
							onblur={() => (hoveredNodeId = null)}
							onclick={() => togglePin(node.id)}
							class="w-full border px-3.5 py-2 text-left transition-colors"
							class:border-[var(--vermilion)]={selected}
							class:bg-[var(--ink)]={selected}
							class:text-[var(--bg-plate)]={selected}
							class:border-[var(--rule)]={!selected}
							class:bg-[var(--bg-plate)]={!selected && connected}
							class:bg-[var(--bg-bone)]={!selected && !connected}
							class:text-[var(--ink)]={!selected && connected}
							class:text-[var(--ink-muted)]={!selected && !connected}
						>
							<span class="font-mono-tech block text-xs font-semibold">{node.label}</span>
						</button>
					{/each}
				</div>
			</div>

			<div class="mt-5 border-t border-[var(--rule)] pt-4">
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
