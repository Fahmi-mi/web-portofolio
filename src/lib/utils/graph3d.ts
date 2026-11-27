export type GraphClusterId = 'all' | 'ai-ml' | 'platforms' | 'tooling';

export type GraphSectionTarget = 'about' | 'projects' | 'experience';

export interface GraphNodeDef {
	id: string;
	label: string;
	shortLabel: string;
	cluster: Exclude<GraphClusterId, 'all'>;
	section: GraphSectionTarget;
	metric: string;
	roleNote: string;
	projectFilter?: 'all' | 'ds-ai' | 'swe';
	projectId?: string;
	stageIndex?: number;
	runIndex?: number;
	honorIndex?: number;
	x: number;
	y: number;
	z: number;
	radius: number;
}

export interface GraphEdgeDef {
	from: string;
	to: string;
	relation: string;
}

export interface ProjectedNode extends GraphNodeDef {
	rx: number;
	ry: number;
	rz: number;
	sx: number;
	sy: number;
	scale: number;
	depthAlpha: number;
}

// Balanced 3D spherical topology grouped cleanly into 3 architectural clusters around origin.
export const PORTFOLIO_GRAPH_NODES: GraphNodeDef[] = [
	// AI & Causal ML cluster (front-upper-left / teal)
	{
		id: 'stage-decisions',
		label: 'Calibrated Decisions',
		shortLabel: 'Decisions',
		cluster: 'ai-ml',
		section: 'about',
		stageIndex: 0,
		metric: '1.96% FAR (alpha 0.05) | $2,679.37 Net Profit',
		roleNote: 'What I Build & Solve Stage 01 · Split conformal & DR-Learner',
		x: -0.34,
		y: -0.46,
		z: 0.48,
		radius: 7.5
	},
	{
		id: 'conformal-router',
		label: 'Conformal LLM Router',
		shortLabel: 'Conformal Router',
		cluster: 'ai-ml',
		section: 'projects',
		projectFilter: 'ds-ai',
		projectId: 'ex-01',
		metric: '96.14% frontier quality · 8.50% cost savings (n=7,214)',
		roleNote: 'RAGTruth split conformal guardrail + FAISS semantic gateway',
		x: -0.78,
		y: -0.22,
		z: 0.56,
		radius: 6.5
	},
	{
		id: 'causal-uplift',
		label: 'Causal Uplift Engine',
		shortLabel: 'Causal Uplift',
		cluster: 'ai-ml',
		section: 'projects',
		projectFilter: 'ds-ai',
		projectId: 'ex-02',
		metric: '$2,679.37 net profit (+75% vs propensity) · Hillstrom 64k',
		roleNote: 'EconML DR-Learner + PuLP constrained policy optimizer',
		x: -0.64,
		y: 0.28,
		z: 0.62,
		radius: 6.5
	},
	{
		id: 'tabular-ml',
		label: 'Tabular ML Pipeline',
		shortLabel: 'Tabular ML',
		cluster: 'ai-ml',
		section: 'projects',
		projectFilter: 'ds-ai',
		projectId: 'end-to-end-ml-pipeline',
		metric: 'LightGBM + XGBoost + CatBoost · MLflow & pytest',
		roleNote: 'Modular Parquet ML training and experiment tracking',
		x: -0.18,
		y: 0.58,
		z: 0.54,
		radius: 5.5
	},
	{
		id: 'assets-ugm',
		label: 'ASSETS UGM (Tech Dev)',
		shortLabel: 'ASSETS UGM',
		cluster: 'ai-ml',
		section: 'experience',
		runIndex: 3,
		metric: 'Feb 2026 - Present · Data Science & AI Mentorship',
		roleNote: 'Teaching ML fundamentals and practical workflows at UGM',
		x: -0.44,
		y: -0.74,
		z: -0.16,
		radius: 5.8
	},
	{
		id: 'honors-datathon',
		label: 'Pingfest & RISTEK Awards',
		shortLabel: 'Awards (Top 3)',
		cluster: 'ai-ml',
		section: 'experience',
		honorIndex: 0,
		metric: '3rd Place Pingfest UNS · 2nd Runner-Up RISTEK UI',
		roleNote: 'National Data Visualization & Datathon competitions',
		x: -0.82,
		y: 0.14,
		z: -0.34,
		radius: 5.8
	},

	// Structured Client Platforms cluster (upper-right / ink)
	{
		id: 'stage-platforms',
		label: 'Structured Platforms',
		shortLabel: 'Platforms',
		cluster: 'platforms',
		section: 'about',
		stageIndex: 1,
		metric: 'Smart School | Localive | Jogja Tour | Tentang Dental',
		roleNote: 'What I Build & Solve Stage 02 · Unified Laravel & API platforms',
		x: 0.42,
		y: -0.42,
		z: 0.42,
		radius: 7.5
	},
	{
		id: 'smart-school',
		label: 'Smart School Platform',
		shortLabel: 'Smart School',
		cluster: 'platforms',
		section: 'experience',
		runIndex: 0,
		metric: 'Laravel Queues + LLM Pipeline + DashboardService',
		roleNote: 'AI teaching module, automated grading sync & analytics',
		x: 0.78,
		y: -0.18,
		z: 0.48,
		radius: 6.4
	},
	{
		id: 'localive',
		label: 'Localive Tourist Village',
		shortLabel: 'Localive API',
		cluster: 'platforms',
		section: 'experience',
		runIndex: 1,
		metric: 'Bilingual ID/EN Laravel REST API · RBAC CMS',
		roleNote: 'Production CMS API with automated media optimization',
		x: 0.86,
		y: 0.16,
		z: -0.14,
		radius: 5.8
	},
	{
		id: 'jogja-tour',
		label: 'Jogja Tour Borobudur',
		shortLabel: 'Jogja Tour',
		cluster: 'platforms',
		section: 'experience',
		runIndex: 2,
		metric: 'PHP + MySQL · Automatic JSON Cache Fallback',
		roleNote: 'Live production tour showcase, inquiry & testimonial APIs',
		x: 0.48,
		y: -0.68,
		z: -0.36,
		radius: 5.6
	},
	{
		id: 'tentang-dental',
		label: 'Tentang Dental Backend',
		shortLabel: 'Dental API',
		cluster: 'platforms',
		section: 'projects',
		projectFilter: 'swe',
		projectId: 'tentang-dental-be',
		metric: 'Laravel REST API · Automated Scramble OpenAPI docs',
		roleNote: 'Clinic operational CMS & documented backend service',
		x: 0.68,
		y: 0.46,
		z: 0.28,
		radius: 5.6
	},

	// Autonomous Streams & CLI Tooling cluster (lower & back-mid / vermilion)
	{
		id: 'stage-automation',
		label: 'Automated Pipelines',
		shortLabel: 'Automation',
		cluster: 'tooling',
		section: 'about',
		stageIndex: 2,
		metric: '4 Airflow DAGs | 5-Stage Agent | Glzr & Trello CLI',
		roleNote: 'What I Build & Solve Stage 03 · Streams, ETL & terminal CLIs',
		x: 0.06,
		y: 0.12,
		z: -0.68,
		radius: 7.5
	},
	{
		id: 'equisentinel',
		label: 'EquiSentinel',
		shortLabel: 'EquiSentinel',
		cluster: 'tooling',
		section: 'projects',
		projectFilter: 'ds-ai',
		projectId: 'ex-03',
		metric: 'Go + NATS Protobuf + 5-Stage LangGraph + TimescaleDB',
		roleNote: 'Real-time market anomaly detection & 4 Airflow ETL DAGs',
		x: -0.22,
		y: 0.56,
		z: -0.58,
		radius: 6.5
	},
	{
		id: 'glzr',
		label: 'Glzr Workspace',
		shortLabel: 'Glzr',
		cluster: 'tooling',
		section: 'projects',
		projectFilter: 'swe',
		projectId: 'glzr',
		metric: 'Svelte · Terminal-first Linux workflow workspace',
		roleNote: 'Streamlined developer workspace management',
		x: 0.46,
		y: 0.62,
		z: -0.38,
		radius: 5.6
	},
	{
		id: 'trello-cli',
		label: 'Trello CLI',
		shortLabel: 'Trello CLI',
		cluster: 'tooling',
		section: 'projects',
		projectFilter: 'swe',
		projectId: 'trello-cli',
		metric: 'TypeScript + Ink · Keyboard-driven Kanban TUI',
		roleNote: 'Manage Trello boards cleanly without leaving the terminal',
		x: -0.64,
		y: 0.72,
		z: -0.18,
		radius: 5.4
	},
	{
		id: 'snapshoot',
		label: 'Snapshoot',
		shortLabel: 'Snapshoot',
		cluster: 'tooling',
		section: 'projects',
		projectFilter: 'swe',
		projectId: 'snapshoot',
		metric: 'Live Web App · Interactive browser capture & framing',
		roleNote: 'Virtual photobooth web app deployed on GitHub Pages',
		x: 0.22,
		y: -0.05,
		z: -0.9,
		radius: 5.2
	}
];

export const PORTFOLIO_GRAPH_EDGES: GraphEdgeDef[] = [
	// AI & Causal cluster links
	{ from: 'stage-decisions', to: 'conformal-router', relation: 'Split Conformal' },
	{ from: 'stage-decisions', to: 'causal-uplift', relation: 'DR-Learner Policy' },
	{ from: 'stage-decisions', to: 'tabular-ml', relation: 'Parquet Ensemble' },
	{ from: 'stage-decisions', to: 'assets-ugm', relation: 'ML Curriculum' },
	{ from: 'stage-decisions', to: 'honors-datathon', relation: 'Datathon Rigor' },
	{ from: 'conformal-router', to: 'causal-uplift', relation: 'LightGBM + FastAPI' },
	{ from: 'tabular-ml', to: 'assets-ugm', relation: 'Hands-on MLflows' },
	{ from: 'causal-uplift', to: 'honors-datathon', relation: 'Applied Analytics' },

	// Structured Platforms cluster links
	{ from: 'stage-platforms', to: 'smart-school', relation: 'Laravel Queues' },
	{ from: 'stage-platforms', to: 'localive', relation: 'Bilingual RBAC API' },
	{ from: 'stage-platforms', to: 'jogja-tour', relation: 'MySQL + JSON Fallback' },
	{ from: 'stage-platforms', to: 'tentang-dental', relation: 'Scramble OpenAPI' },
	{ from: 'smart-school', to: 'localive', relation: 'Shared Laravel Core' },
	{ from: 'localive', to: 'tentang-dental', relation: 'REST API Design' },

	// Autonomous & Tooling cluster links
	{ from: 'stage-automation', to: 'equisentinel', relation: 'NATS + LangGraph' },
	{ from: 'stage-automation', to: 'glzr', relation: 'Linux Workspace' },
	{ from: 'stage-automation', to: 'trello-cli', relation: 'Terminal TUI' },
	{ from: 'stage-automation', to: 'snapshoot', relation: 'Web Capture UI' },

	// Verified cross-cluster portfolio bridges
	{ from: 'smart-school', to: 'conformal-router', relation: 'LLM Guardrails & Sync' },
	{ from: 'conformal-router', to: 'equisentinel', relation: 'SvelteKit + Python' },
	{ from: 'equisentinel', to: 'glzr', relation: 'Svelte Frontend' },
	{ from: 'equisentinel', to: 'tabular-ml', relation: 'Time-series Features' },
	{ from: 'stage-decisions', to: 'stage-platforms', relation: 'Applied AI Delivery' },
	{ from: 'stage-platforms', to: 'stage-automation', relation: 'Production Systems' }
];

export function rotatePoint3D(
	x: number,
	y: number,
	z: number,
	pitchX: number,
	yawY: number
): { rx: number; ry: number; rz: number } {
	const cosY = Math.cos(yawY);
	const sinY = Math.sin(yawY);
	const x1 = x * cosY + z * sinY;
	const z1 = -x * sinY + z * cosY;

	const cosX = Math.cos(pitchX);
	const sinX = Math.sin(pitchX);
	const y2 = y * cosX - z1 * sinX;
	const z2 = y * sinX + z1 * cosX;

	return { rx: x1, ry: y2, rz: z2 };
}

export function projectPoint3D(
	rx: number,
	ry: number,
	rz: number,
	width: number,
	height: number,
	fov = 3.1
): { sx: number; sy: number; scale: number; depthAlpha: number } {
	const radiusPx = Math.min(width, height) * 0.41;
	const safeZ = Math.max(-1.6, rz);
	const scale = fov / (fov + safeZ);
	const sx = width * 0.5 + rx * radiusPx * scale;
	const sy = height * 0.5 + ry * radiusPx * scale;
	const depthAlpha = Math.max(0.28, Math.min(1, 0.72 - rz * 0.38));

	return { sx, sy, scale, depthAlpha };
}

export function findNearestProjectedNode(
	nodes: ProjectedNode[],
	pointerX: number,
	pointerY: number,
	maxDistance = 30
): ProjectedNode | null {
	let winner: ProjectedNode | null = null;
	let bestScore = Infinity;

	for (let i = 0; i < nodes.length; i++) {
		const node = nodes[i];
		const dist = Math.hypot(pointerX - node.sx, pointerY - node.sy);
		if (dist > maxDistance) continue;
		// Slightly bias front-most nodes when two overlap along the view ray.
		const weightedDist = dist + node.rz * 6;
		if (weightedDist < bestScore) {
			bestScore = weightedDist;
			winner = node;
		}
	}

	return winner;
}
