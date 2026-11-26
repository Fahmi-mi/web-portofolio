import { describe, expect, it } from 'vitest';
import { getDomainTopologyHighlight, nextTraceIndex } from '../src/lib/utils/interactions';

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
});
