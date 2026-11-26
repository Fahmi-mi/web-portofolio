import { describe, expect, it } from 'vitest';
import {
	EXPERIENCE_ITEMS,
	FEATURED_PROJECTS,
	HERO_DOMAINS,
	HERO_TELEMETRY_LINES,
	HONOR_ITEMS,
	LEADERSHIP_ITEM,
	PROFILE,
	SECONDARY_PROJECTS,
	SKILL_GROUPS,
	SYSTEM_BRIDGE_EDGES,
	SYSTEM_BRIDGE_NODES,
	filterFeaturedProjects,
	filterSecondaryProjects,
	getConformalStats,
	getHeroDomainSummary
} from '../src/lib/data/portfolio';

describe('portfolio dataset & filter helpers', () => {
	it('filters featured DS/AI projects by active tab', () => {
		expect(filterFeaturedProjects('all')).toHaveLength(3);
		expect(filterFeaturedProjects('ds-ai')).toHaveLength(3);
		expect(filterFeaturedProjects('swe')).toHaveLength(0);
	});

	it('filters secondary projects across all, ds-ai, and swe categories', () => {
		const all = filterSecondaryProjects('all');
		const ds = filterSecondaryProjects('ds-ai');
		const swe = filterSecondaryProjects('swe');

		expect(all).toHaveLength(5);
		expect(ds).toHaveLength(1);
		expect(ds[0].id).toBe('end-to-end-ml-pipeline');
		expect(swe.map((p) => p.id)).toEqual([
			'glzr',
			'trello-cli',
			'tentang-dental-be',
			'snapshoot'
		]);
	});

	it('computes verified RAGTruth conformal statistics proportionally for alpha 0.10 and 0.05', () => {
		const a10 = getConformalStats(0.1);
		const a05 = getConformalStats(0.05);

		expect(a10.alphaLabel).toBe('alpha = 0.10');
		expect(a10.falseAcceptRate).toBe('4.15%');
		expect(a10.bandHeight).toBe(27);
		expect(a05.alphaLabel).toBe('alpha = 0.05');
		expect(a05.falseAcceptRate).toBe('1.96%');
		expect(a05.bandHeight).toBe(13);
	});

	it('keeps SystemsBridge edges strictly grounded in verified project stacks', () => {
		const edgePairs = SYSTEM_BRIDGE_EDGES.map((edge) => `${edge.from}->${edge.to}`);
		expect(edgePairs).not.toContain('conformal->laravel');
		expect(edgePairs).not.toContain('causal->airflow');
		expect(edgePairs).not.toContain('agents->laravel');
	});

	it('returns hero domain metadata for each core capability', () => {
		expect(HERO_DOMAINS).toHaveLength(3);
		expect(getHeroDomainSummary('causal-policy').highlightMetric).toContain('$2,679.37');
		expect(getHeroDomainSummary('statistical-ml').highlightMetric).toContain('96.14%');
		expect(getHeroDomainSummary('production-systems').highlightMetric).toContain('LangGraph');
	});

	it('includes all 3 freelance engagements, 2 national awards, and ASSETS UGM leadership', () => {
		expect(EXPERIENCE_ITEMS.map((e) => e.organization)).toEqual([
			'Smart School Platform',
			'Localive Tourist Village Platform',
			'Jogja Tour Borobudur'
		]);
		expect(HONOR_ITEMS).toHaveLength(2);
		expect(LEADERSHIP_ITEM.organization).toBe('ASSETS UGM');
		expect(SKILL_GROUPS).toHaveLength(3);
		expect(SYSTEM_BRIDGE_NODES.length).toBeGreaterThanOrEqual(7);
		expect(SYSTEM_BRIDGE_EDGES.length).toBeGreaterThanOrEqual(6);
		expect(HERO_TELEMETRY_LINES.length).toBeGreaterThanOrEqual(3);
	});

	it('enforces UI copy hygiene: zero arrows, zero emojis, zero private phone or photo leaks', () => {
		const serialized = JSON.stringify({
			PROFILE,
			HERO_DOMAINS,
			HERO_TELEMETRY_LINES,
			SYSTEM_BRIDGE_NODES,
			SYSTEM_BRIDGE_EDGES,
			FEATURED_PROJECTS,
			SECONDARY_PROJECTS,
			EXPERIENCE_ITEMS,
			HONOR_ITEMS,
			LEADERSHIP_ITEM,
			SKILL_GROUPS
		});

		expect(serialized).not.toMatch(/[→↓↗←↑●•🚀🔥✨💡🎯]/);
		expect(serialized).not.toMatch(/->|=>/);
		expect(serialized).not.toContain('895-3230-98731');
		expect(serialized).not.toContain('foto.jpeg');
	});
});
