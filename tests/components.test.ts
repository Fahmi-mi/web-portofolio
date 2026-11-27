import { describe, expect, it } from 'vitest';
import { SYSTEM_BRIDGE_EDGES } from '../src/lib/data/portfolio';
import {
	PORTFOLIO_GRAPH_EDGES,
	PORTFOLIO_GRAPH_NODES,
	findNearestProjectedNode,
	projectPoint3D,
	rotatePoint3D
} from '../src/lib/utils/graph3d';
import {
	clampScrollStage,
	computeBipartitePath,
	copyEmailSafely,
	getConnectedEdges,
	getDomainTopologyHighlight,
	getProjectCounts,
	nextTraceIndex,
	resolveBridgeSelection,
	toggleConformalAlpha
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
		expect(conformalEdges).toHaveLength(1);
		expect(conformalEdges[0].to).toBe('fastapi');

		const causalEdges = getConnectedEdges('causal', SYSTEM_BRIDGE_EDGES);
		expect(causalEdges).toHaveLength(2);
		expect(causalEdges.every((edge) => edge.from === 'causal' || edge.to === 'causal')).toBe(true);
	});

	it('computes exact featured and secondary project counts per filter', () => {
		expect(getProjectCounts('all')).toEqual({ featured: 3, secondary: 5, total: 8 });
		expect(getProjectCounts('ds-ai')).toEqual({ featured: 3, secondary: 1, total: 4 });
		expect(getProjectCounts('swe')).toEqual({ featured: 0, secondary: 4, total: 4 });
	});

	it('toggles conformal alpha between 0.10 and 0.05', () => {
		expect(toggleConformalAlpha(0.1)).toBe(0.05);
		expect(toggleConformalAlpha(0.05)).toBe(0.1);
	});

	it('copies email safely and falls back gracefully when clipboard fails or is absent', async () => {
		const okResult = await copyEmailSafely('fahmihaqqulihsan@gmail.com', {
			writeText: async () => undefined
		});
		expect(okResult).toBe('copied');

		const missingResult = await copyEmailSafely('fahmihaqqulihsan@gmail.com', undefined);
		expect(missingResult).toBe('fallback');

		const rejectedResult = await copyEmailSafely('fahmihaqqulihsan@gmail.com', {
			writeText: async () => {
				throw new Error('Permission denied');
			}
		});
		expect(rejectedResult).toBe('fallback');
	});

	it('separates hover preview from click-pinned node selection', () => {
		expect(resolveBridgeSelection('conformal', 'causal')).toBe('causal');
		expect(resolveBridgeSelection('conformal', null)).toBe('conformal');
		expect(resolveBridgeSelection(null, null)).toBeNull();
	});

	it('clamps scrollytelling stage indices and builds smooth horizontal bezier paths', () => {
		expect(clampScrollStage(-1, 3)).toBe(0);
		expect(clampScrollStage(1, 3)).toBe(1);
		expect(clampScrollStage(5, 3)).toBe(2);

		const path = computeBipartitePath(36, 102, 160);
		expect(path).toContain('M 0 36');
		expect(path).toContain('160 102');
	});

	it('projects and hit-tests the 3D portfolio constellation cleanly while preserving radial distance', () => {
		const nodeIds = new Set(PORTFOLIO_GRAPH_NODES.map((n) => n.id));
		expect(PORTFOLIO_GRAPH_NODES.length).toBe(16);
		for (const edge of PORTFOLIO_GRAPH_EDGES) {
			expect(nodeIds.has(edge.from)).toBe(true);
			expect(nodeIds.has(edge.to)).toBe(true);
		}

		const rotated = rotatePoint3D(0.6, -0.4, 0.5, 0.45, 0.9);
		expect(Math.hypot(rotated.rx, rotated.ry, rotated.rz)).toBeCloseTo(
			Math.hypot(0.6, -0.4, 0.5),
			5
		);

		const nearPt = projectPoint3D(0.2, 0.2, -0.6, 520, 420);
		const farPt = projectPoint3D(0.2, 0.2, 0.6, 520, 420);
		expect(nearPt.scale).toBeGreaterThan(farPt.scale);
		expect(nearPt.depthAlpha).toBeGreaterThan(farPt.depthAlpha);

		const projected = PORTFOLIO_GRAPH_NODES.map((n) => {
			const rot = rotatePoint3D(n.x, n.y, n.z, 0.2, -0.35);
			return { ...n, ...rot, ...projectPoint3D(rot.rx, rot.ry, rot.rz, 520, 420) };
		});
		const target = projected[0];
		expect(findNearestProjectedNode(projected, target.sx + 2, target.sy - 2, 30)?.id).toBe(target.id);
		expect(findNearestProjectedNode(projected, -200, -200, 30)).toBeNull();
	});
});
