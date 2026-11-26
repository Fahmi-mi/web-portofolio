import {
	getHeroDomainSummary,
	type BridgeEdge,
	type HeroDomainId
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
