import {
	filterFeaturedProjects,
	filterSecondaryProjects,
	getHeroDomainSummary,
	type BridgeEdge,
	type ConformalAlpha,
	type HeroDomainId,
	type ProjectFilter
} from '$lib/data/portfolio';

export function nextTraceIndex(current: number, total: number, reducedMotion: boolean): number {
	if (total <= 0 || reducedMotion) {
		return Math.max(0, Math.min(current, Math.max(0, total - 1)));
	}
	return (current + 1) % total;
}

export function getDomainTopologyHighlight(domainId: HeroDomainId): string[] {
	return getHeroDomainSummary(domainId).nodes;
}

export function getConnectedEdges(nodeId: string | null, edges: BridgeEdge[]): BridgeEdge[] {
	if (!nodeId) return edges;
	return edges.filter((edge) => edge.from === nodeId || edge.to === nodeId);
}

export function resolveBridgeSelection(
	pinnedNodeId: string | null,
	hoveredNodeId: string | null
): string | null {
	return hoveredNodeId ?? pinnedNodeId;
}

export function clampScrollStage(index: number, total: number): number {
	if (total <= 0) return 0;
	return Math.max(0, Math.min(index, total - 1));
}

export function computeBipartitePath(y1: number, y2: number, width: number): string {
	const midX = Math.round(width / 2);
	return `M 0 ${Math.round(y1)} C ${midX} ${Math.round(y1)}, ${midX} ${Math.round(y2)}, ${width} ${Math.round(y2)}`;
}

export function getProjectCounts(filter: ProjectFilter): {
	featured: number;
	secondary: number;
	total: number;
} {
	const featured = filterFeaturedProjects(filter).length;
	const secondary = filterSecondaryProjects(filter).length;
	return { featured, secondary, total: featured + secondary };
}

export function toggleConformalAlpha(current: ConformalAlpha): ConformalAlpha {
	return current === 0.1 ? 0.05 : 0.1;
}

export async function copyEmailSafely(
	email: string,
	clipboardApi: Pick<Clipboard, 'writeText'> | undefined
): Promise<'copied' | 'fallback'> {
	if (!clipboardApi?.writeText) return 'fallback';
	try {
		await clipboardApi.writeText(email);
		return 'copied';
	} catch {
		return 'fallback';
	}
}

/** Sets cursor coordinates on a `.clean-spotlight-card` without touching layout. */
export function updateCardSpotlight(event: PointerEvent & { currentTarget: HTMLElement }): void {
	const rect = event.currentTarget.getBoundingClientRect();
	event.currentTarget.style.setProperty('--spot-x', `${Math.round(event.clientX - rect.left)}px`);
	event.currentTarget.style.setProperty('--spot-y', `${Math.round(event.clientY - rect.top)}px`);
}
