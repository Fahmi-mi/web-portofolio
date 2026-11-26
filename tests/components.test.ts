import { describe, expect, it } from 'vitest';
import { SYSTEM_BRIDGE_EDGES } from '../src/lib/data/portfolio';
import {
	getConnectedEdges,
	getDomainTopologyHighlight,
	nextTraceIndex
} from '../src/lib/utils/interactions';

describe('component interaction helpers', () => {
	it('steps trace index deterministically and freezes under reducedMotion', () => {
		expect(nextTraceIndex(0, 3, false)).toBe(1);
		expect(nextTraceIndex(2, 3, false)).toBe(0);
		expect(nextTraceIndex(1, 3, true)).toBe(1);
		expect(nextTraceIndex(0, 0, false)).toBe(0);
	});

	it('returns active node highlights for each hero domain', () => {
		expect(getDomainTopologyHighlight('statistical-ml')).toContain('ml-conformal');
		expect(getDomainTopologyHighlight('causal-policy')).toContain('ml-causal');
		expect(getDomainTopologyHighlight('production-systems')).toContain('sys-go-nats');
	});

	it('filters bipartite bridge edges by selected node and defaults to all when null', () => {
		expect(getConnectedEdges(null, SYSTEM_BRIDGE_EDGES)).toHaveLength(SYSTEM_BRIDGE_EDGES.length);

		const conformalEdges = getConnectedEdges('conformal', SYSTEM_BRIDGE_EDGES);
		expect(conformalEdges.length).toBeGreaterThanOrEqual(2);
		expect(conformalEdges.every((edge) => edge.from === 'conformal' || edge.to === 'conformal')).toBe(
			true
		);
	});
});
