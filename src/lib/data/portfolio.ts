export type ProjectCategory = 'ds-ai' | 'swe';
export type ProjectFilter = 'all' | ProjectCategory;
export type ConformalAlpha = 0.1 | 0.05;
export type HeroDomainId = 'statistical-ml' | 'causal-policy' | 'production-systems';

export interface TelemetryLine {
	tag: string;
	message: string;
	outcome: string;
	tone: 'ok' | 'alert' | 'neutral';
}

export interface HeroDomain {
	id: HeroDomainId;
	label: string;
	roleNote: string;
	highlightMetric: string;
	linkedProject: string;
	nodes: string[];
}

export interface BridgeNode {
	id: string;
	label: string;
	side: 'ml' | 'system';
	detail: string;
}

export interface BridgeEdge {
	from: string;
	to: string;
	project: string;
	proof: string;
}

export interface FeaturedProject {
	id: 'ex-01' | 'ex-02' | 'ex-03';
	code: string;
	title: string;
	period: string;
	category: 'ds-ai';
	visualVariant: 'conformal' | 'causal' | 'equisentinel';
	summary: string;
	highlights: string[];
	stack: string[];
	repoUrl: string;
}

export interface SecondaryProject {
	id: string;
	title: string;
	period: string;
	category: ProjectCategory;
	visualVariant: 'tabular' | 'glzr' | 'trello' | 'api' | 'web';
	summary: string;
	stack: string[];
	repoUrl: string;
	liveUrl?: string;
}

export interface ExperienceItem {
	organization: string;
	role: string;
	period: string;
	location: string;
	highlights: string[];
	stack: string[];
	repoUrl?: string;
	liveUrl?: string;
}

export interface HonorItem {
	title: string;
	organizer: string;
	date: string;
	rank: string;
}

export interface SkillGroup {
	category: string;
	items: string[];
}

export const PROFILE = {
	name: 'Fahmi Haqqul Ihsan',
	shortBrand: 'FAHMI.IHSAN',
	location: 'Yogyakarta, Indonesia',
	university: 'Universitas Gadjah Mada',
	degree: 'Bachelor of Applied Science in Software Engineering Technology',
	studyPeriod: 'July 2024 - Expected July 2028',
	gpa: '3.74 / 4.00',
	primaryRole: 'Data Science & AI Engineering',
	secondaryRole: 'Software Engineering',
	bio: 'Software Engineering Technology undergraduate focusing on Data Science and AI Engineering. Experienced in causal ML, conformal LLM evaluation, and data pipelines, combining analytical rigor with backend engineering to ship production-ready systems.',
	email: 'fahmihaqqulihsan@gmail.com',
	linkedin: 'https://linkedin.com/in/fahmi-haqqul-ihsan-b13276326',
	github: 'https://github.com/Fahmi-mi',
	cvPath: '/Fahmi-Haqqul-Ihsan-CV.pdf',
	cvDownloadName: 'Fahmi-Haqqul-Ihsan-CV.pdf'
} as const;

export const HERO_DOMAINS: HeroDomain[] = [
	{
		id: 'statistical-ml',
		label: 'Statistical ML',
		roleNote: 'Split conformal uncertainty bounds and Pareto cost-quality routing',
		highlightMetric: '96.14% frontier quality with 8.50% cost savings (RouterBench n=7,214)',
		linkedProject: 'Conformal Hallucination Control & LLM Router',
		nodes: ['ml-conformal', 'sys-fastapi', 'ml-router']
	},
	{
		id: 'causal-policy',
		label: 'Causal Policy',
		roleNote: 'Doubly-robust uplift estimation and constrained LP/MILP allocation',
		highlightMetric: '$2,679.37 projected net profit via DR-Learner (+75% vs propensity)',
		linkedProject: 'Causal Uplift Modeling & Constrained Policy Engine',
		nodes: ['ml-causal', 'sys-duckdb', 'ml-policy']
	},
	{
		id: 'production-systems',
		label: 'Production Systems',
		roleNote: 'Event-driven streaming, multi-stage LLM agents, and client web APIs',
		highlightMetric: '5-stage LangGraph worker, 4 Airflow DAGs, NATS Protobuf & Go gateway',
		linkedProject: 'EquiSentinel & Freelance Production Platforms',
		nodes: ['sys-go-nats', 'ml-langgraph', 'sys-airflow']
	}
];

export const HERO_TELEMETRY_LINES: TelemetryLine[] = [
	{
		tag: 'conformal-router',
		message: 'RAGTruth n=2,700 calibrated via MAPIE + LightGBM (Brier 0.1734)',
		outcome: 'false-accept 13.52% down to 4.15% (alpha 0.10) and 1.96% (alpha 0.05)',
		tone: 'ok'
	},
	{
		tag: 'causal-policy',
		message: 'Hillstrom RCT 64k records at $2,500 budget ($15/visit, $0.50/email)',
		outcome: 'DR-Learner AUUC 0.0213 / Qini 0.0368 / $2,679.37 net profit',
		tone: 'ok'
	},
	{
		tag: 'equisentinel',
		message: 'NATS JetStream Protobuf stream triggers (>3% price / >5x volume)',
		outcome: 'Go gateway / 5-stage LangGraph DeepSeek / 5m Redis + TimescaleDB',
		tone: 'alert'
	}
];

export const SYSTEM_BRIDGE_NODES: BridgeNode[] = [
	{
		id: 'conformal',
		label: 'MAPIE + LightGBM Conformal',
		side: 'ml',
		detail: 'Distribution-free hallucination guardrails and OOD validation (mbpp AUC-QC 0.5148).'
	},
	{
		id: 'causal',
		label: 'EconML DR-Learner + PuLP',
		side: 'ml',
		detail: 'Uplift modeling, SMD balance diagnostics, Thompson Sampling, and PSI drift checks.'
	},
	{
		id: 'agents',
		label: 'LangGraph 5-Stage + DeepSeek',
		side: 'ml',
		detail: 'Pydantic-validated anomaly reasoning with 5-minute Redis caching and HITL feedback.'
	},
	{
		id: 'llm-pipeline',
		label: 'Provider-Agnostic LLM Pipeline',
		side: 'ml',
		detail: 'Prompt-injection hardening and automated grading sync in production education software.'
	},
	{
		id: 'fastapi',
		label: 'FastAPI + FAISS + SQLite',
		side: 'system',
		detail: 'Semantic cache inference gateway and decision endpoints with Docker Compose.'
	},
	{
		id: 'duckdb',
		label: 'DuckDB + Polars + Streamlit',
		side: 'system',
		detail: '64k RCT analytical ingestion and interactive constrained budget policy simulator.'
	},
	{
		id: 'streaming',
		label: 'Go + NATS JetStream',
		side: 'system',
		detail: 'Protobuf event-stream ingestion and WebSocket/REST gateway for real-time ticks.'
	},
	{
		id: 'airflow',
		label: 'Airflow + TimescaleDB',
		side: 'system',
		detail: '4 OHLCV ETL DAGs (1m/5m/1h) with gap filling and feature_store_ai.'
	},
	{
		id: 'laravel',
		label: 'Laravel Queues + PHP + MySQL',
		side: 'system',
		detail: 'Async education suite, DashboardService analytics, bilingual RBAC, and tour APIs.'
	}
];

export const SYSTEM_BRIDGE_EDGES: BridgeEdge[] = [
	{
		from: 'conformal',
		to: 'fastapi',
		project: 'Conformal LLM Router',
		proof: '96.14% frontier quality retained with 8.50% cost reduction over FAISS/SQLite gateway'
	},
	{
		from: 'causal',
		to: 'fastapi',
		project: 'Causal Uplift Policy Engine',
		proof: 'FastAPI decision engine serving LP/MILP constrained policy allocations'
	},
	{
		from: 'causal',
		to: 'duckdb',
		project: 'Causal Uplift Simulator',
		proof: 'DuckDB/Polars ingestion and Streamlit policy simulator ($2,679.37 projected net profit)'
	},
	{
		from: 'agents',
		to: 'streaming',
		project: 'EquiSentinel Ingestion',
		proof: 'Real-time >3% price and >5x volume anomaly detection over NATS Protobuf'
	},
	{
		from: 'agents',
		to: 'airflow',
		project: 'EquiSentinel Feature Store',
		proof: '4 Airflow ETL DAGs feeding SMA/EMA/RSI/Bollinger features to TimescaleDB'
	},
	{
		from: 'llm-pipeline',
		to: 'laravel',
		project: 'Smart School Platform',
		proof: 'Async Laravel Queues + Livewire AI question bank and DashboardService analytics'
	}
];

export const FEATURED_PROJECTS: FeaturedProject[] = [
	{
		id: 'ex-01',
		code: 'EX-01',
		title: 'Conformal Hallucination Control & LLM Router',
		period: 'November 2026',
		category: 'ds-ai',
		visualVariant: 'conformal',
		summary:
			'Split conformal hallucination guardrail paired with a learned cost-quality router and semantic-cached inference gateway.',
		highlights: [
			'RAGTruth (n=2,700): cut false-accept rate from 13.52% to 4.15% (alpha=0.10) and 1.96% (alpha=0.05), Brier score 0.1734.',
			'RouterBench (n=7,214): retained 96.14% frontier quality (0.7480 vs 0.7780) with 8.50% cost savings (AUC-QC 0.5206).',
			'OOD mbpp (n=427): AUC-QC 0.5148 with 3.07% cost savings at >=95% quality; FastAPI + FAISS/SQLite + SvelteKit + Docker.'
		],
		stack: ['Python', 'MAPIE', 'LightGBM', 'FastAPI', 'FAISS', 'SvelteKit', 'Docker'],
		repoUrl: 'https://github.com/Fahmi-mi/conformal-llm-router'
	},
	{
		id: 'ex-02',
		code: 'EX-02',
		title: 'Causal Uplift Modeling & Policy Engine',
		period: 'November 2026',
		category: 'ds-ai',
		visualVariant: 'causal',
		summary:
			'RCT causal uplift benchmarking, LP/MILP constrained budget optimizer, Thompson Sampling simulator, and PSI drift monitor.',
		highlights: [
			'Benchmarked S/T/X/DR-Learner and Causal Forest on Hillstrom RCT (64k records) via DuckDB/Polars with SMD balance diagnostics.',
			'DR-Learner achieved AUUC 0.0213, Qini 0.0368, and $2,679.37 projected net profit at $2,500 budget ($15/visit, $0.50/email).',
			'Outperformed naive propensity targeting ($1,529.02, +75% lift) and random baseline ($679.37, ~4x lift).'
		],
		stack: ['Python', 'EconML', 'LightGBM', 'DuckDB', 'Polars', 'SciPy/PuLP', 'FastAPI', 'Streamlit'],
		repoUrl: 'https://github.com/Fahmi-mi/causal-uplift-policy'
	},
	{
		id: 'ex-03',
		code: 'EX-03',
		title: 'EquiSentinel',
		period: 'June - September 2026',
		category: 'ds-ai',
		visualVariant: 'equisentinel',
		summary:
			'Event-driven market anomaly detection and 5-stage LangGraph reasoning system backed by Go, NATS JetStream, and Airflow.',
		highlights: [
			'Simulated real-time market feed via Geometric Brownian Motion over NATS JetStream (Protobuf) and Go WebSocket/REST gateway.',
			'Detects >3% price and >5x volume anomalies using a 5-stage LangGraph worker (DeepSeek, Pydantic) with 5-minute Redis cache and HITL feedback.',
			'Built 4 Apache Airflow ETL DAGs in pandas for 1m/5m/1h OHLCV, SMA/EMA/RSI/Bollinger, gap filling, and TimescaleDB feature_store_ai.'
		],
		stack: ['Python', 'Go', 'LangGraph', 'DeepSeek', 'Airflow', 'TimescaleDB', 'NATS', 'Redis', 'SvelteKit'],
		repoUrl: 'https://github.com/Fahmi-mi/equisentinel'
	}
];

export const SECONDARY_PROJECTS: SecondaryProject[] = [
	{
		id: 'end-to-end-ml-pipeline',
		title: 'End-to-End Tabular ML Pipeline',
		period: 'July 2025 - June 2026',
		category: 'ds-ai',
		visualVariant: 'tabular',
		summary:
			'Modular tabular machine learning workflow integrating gradient-boosted ensembles, Parquet data handling, MLflow experiment tracking, and pytest validation.',
		stack: ['Python', 'LightGBM', 'XGBoost', 'CatBoost', 'MLflow', 'Parquet', 'pytest'],
		repoUrl: 'https://github.com/Fahmi-mi/end-to-end-ml-pipeline'
	},
	{
		id: 'glzr',
		title: 'glzr',
		period: 'Open Source',
		category: 'swe',
		visualVariant: 'glzr',
		summary:
			'Terminal-first developer workspace crafted with Svelte for streamlined Linux workflow management.',
		stack: ['Svelte', 'Linux', 'Workspace Tooling'],
		repoUrl: 'https://github.com/Fahmi-mi/glzr'
	},
	{
		id: 'trello-cli',
		title: 'trello-cli',
		period: 'Open Source',
		category: 'swe',
		visualVariant: 'trello',
		summary:
			'Keyboard-driven terminal user interface for managing Trello boards without leaving the command line.',
		stack: ['TypeScript', 'Ink', 'CLI'],
		repoUrl: 'https://github.com/Fahmi-mi/trello-cli'
	},
	{
		id: 'tentang-dental-be',
		title: 'tentang-dental-be',
		period: 'Backend System',
		category: 'swe',
		visualVariant: 'api',
		summary:
			'Dental clinic CMS and operational REST API engineered in Laravel with automated Scramble API documentation.',
		stack: ['PHP', 'Laravel', 'REST API', 'Scramble'],
		repoUrl: 'https://github.com/Fahmi-mi/tentang-dental-be'
	},
	{
		id: 'snapshoot',
		title: 'snapshoot',
		period: 'Web App',
		category: 'swe',
		visualVariant: 'web',
		summary:
			'Virtual photobooth web application deployed live for interactive browser capture and framing.',
		stack: ['HTML', 'CSS', 'Web App'],
		repoUrl: 'https://github.com/Fahmi-mi/snapshoot',
		liveUrl: 'https://fahmi-mi.github.io/snapshoot/'
	}
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
	{
		organization: 'Smart School Platform',
		role: 'Fullstack & AI Engineer (Freelance)',
		period: 'July 2026',
		location: 'Yogyakarta, Indonesia',
		highlights: [
			'Built an end-to-end AI teaching module, question-bank, and online exam suite using Laravel Queues and Livewire/Blade with a provider-agnostic LLM pipeline, prompt-injection hardening, automated grading sync, and test coverage.',
			'Developed a live school analytics dashboard (DashboardService) integrating KPI cards, 7-day attendance trends, tuition collection breakdowns, and counseling/extracurricular metrics.'
		],
		stack: ['Laravel Queues', 'Livewire', 'Blade', 'LLM Pipeline', 'DashboardService']
	},
	{
		organization: 'Localive Tourist Village Platform',
		role: 'Backend Developer (Freelance)',
		period: 'July 2026',
		location: 'Yogyakarta, Indonesia',
		highlights: [
			'Built and deployed a production Laravel REST API powering a bilingual (ID/EN) CMS with draft/publish workflows and role-based access control (RBAC).',
			'Engineered an automated image optimization pipeline tailored for shared-hosting constraints to ensure reliable media delivery in production.'
		],
		stack: ['Laravel', 'REST API', 'RBAC', 'Bilingual CMS', 'Media Pipeline']
	},
	{
		organization: 'Jogja Tour Borobudur',
		role: 'Fullstack Web Developer (Freelance)',
		period: 'February - March 2026',
		location: 'Yogyakarta, Indonesia',
		highlights: [
			'Built and shipped the production company website featuring tour package pricing, destination showcases, email inquiry endpoint (send_email.php), and testimonial APIs (get_testimoni.php, post_testimoni.php).',
			'Engineered MySQL persistence with input validation, spam protection, automatic JSON cache fallback (cache/testimoni.json) for shared-hosting reliability, plus sitemap.xml and robots.txt SEO.'
		],
		stack: ['PHP', 'MySQL', 'JavaScript', 'JSON Cache Fallback', 'SEO'],
		repoUrl: 'https://github.com/Fahmi-mi/jogja-tour-borobudur',
		liveUrl: 'https://jogjatour-borobudur.com'
	}
];

export const HONOR_ITEMS: HonorItem[] = [
	{
		title: '3rd Place Winner (National), Data Visualization Competition',
		organizer: 'Pingfest IT Venture UNS',
		date: 'October 2025',
		rank: 'National 3rd'
	},
	{
		title: '2nd Runner-Up (National), Datathon',
		organizer: 'RISTEK Fasilkom Universitas Indonesia',
		date: 'September 2025',
		rank: 'National Top 3'
	}
];

export const LEADERSHIP_ITEM = {
	organization: 'ASSETS UGM',
	role: 'IT Staff, Data Science & AI Division (Tech Dev)',
	period: 'February 2026 - Present',
	location: 'Yogyakarta, Indonesia',
	highlights: [
		'Taught and mentored junior students in Machine Learning and AI fundamentals through hands-on learning sessions.',
		'Guided participants through practical ML workflows and concept walkthroughs.'
	]
};

export const SKILL_GROUPS: SkillGroup[] = [
	{
		category: 'Languages',
		items: ['Python', 'SQL', 'TypeScript', 'Go', 'PHP']
	},
	{
		category: 'Data Science & AI',
		items: [
			'pandas',
			'Polars',
			'NumPy',
			'SciPy',
			'scikit-learn',
			'LightGBM',
			'EconML',
			'MAPIE',
			'PyTorch',
			'Matplotlib',
			'Seaborn',
			'LangGraph',
			'LangChain'
		]
	},
	{
		category: 'Backend, Data & Tools',
		items: [
			'FastAPI',
			'Laravel',
			'Streamlit',
			'Apache Airflow',
			'DuckDB',
			'PostgreSQL',
			'TimescaleDB',
			'Redis',
			'FAISS',
			'Docker',
			'Git',
			'pytest'
		]
	}
];

export function filterFeaturedProjects(filter: ProjectFilter): FeaturedProject[] {
	if (filter === 'swe') return [];
	return FEATURED_PROJECTS;
}

export function filterSecondaryProjects(filter: ProjectFilter): SecondaryProject[] {
	if (filter === 'all') return SECONDARY_PROJECTS;
	return SECONDARY_PROJECTS.filter((project) => project.category === filter);
}

export function getConformalStats(alpha: ConformalAlpha): {
	alphaLabel: string;
	falseAcceptRate: string;
	reductionDelta: string;
	bandHeight: number;
} {
	if (alpha === 0.05) {
		return {
			alphaLabel: 'alpha = 0.05',
			falseAcceptRate: '1.96%',
			reductionDelta: '-11.56 pts vs 13.52% heuristic',
			bandHeight: 13
		};
	}
	return {
		alphaLabel: 'alpha = 0.10',
		falseAcceptRate: '4.15%',
		reductionDelta: '-9.37 pts vs 13.52% heuristic',
		bandHeight: 27
	};
}

export function getHeroDomainSummary(id: HeroDomainId): HeroDomain {
	const found = HERO_DOMAINS.find((item) => item.id === id);
	return found ?? HERO_DOMAINS[0];
}
