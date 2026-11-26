# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

SvelteKit (`@sveltejs/adapter-static` outputting to `dist/`) + Tailwind CSS + lightweight Canvas 2D / SVG + native `position: sticky` / `IntersectionObserver` (user-selected; chosen for zero Virtual DOM overhead, small static bundle on Cloudflare Pages, and smooth 60fps performance on low-end devices).

## Users

- **Primary:** Technical recruiters, hiring managers, and Data Science / AI / Software Engineering leads evaluating Fahmi Haqqul Ihsan for next-semester internship roles.
- **Secondary:** Engineering peers and potential freelance clients reviewing technical depth and live repositories.

## Product Purpose

Showcase Fahmi Haqqul Ihsan's verified Data Science & AI Engineering (primary) and Software Engineering (secondary) work, production freelance systems, and national competition awards on `fahmiihsan.my.id`, converting visitor attention into internship interviews, repository exploration, and CV downloads.

## Positioning

Combines statistical and causal AI rigor (conformal hallucination control, causal uplift policy optimization, multi-stage LangGraph agents) with backend and data-pipeline engineering (Go, FastAPI, Apache Airflow, TimescaleDB, NATS JetStream, Laravel), communicated through scroll-coupled visual explanations directly tied to real project architectures and verified metrics rather than generic decorative graphics.

## Operating Context

- **Deployment:** Static site built to `dist/` and served via Cloudflare Pages at `fahmiihsan.my.id` from a GitHub repository containing `web/`. `PORTFOLIO_CONTEXT.md` is a temporary handoff file and must be excluded/removed before pushing to GitHub.
- **Evaluation Flow:** Recruiters scan quickly on both desktop monitors and modest mobile devices; `Fahmi Haqqul Ihsan-CV.pdf` serves as the complete formal resume download.

## Capabilities and Constraints

- **Language:** English only (matching `../cv/main.tex` and technical DS/AI terminology).
- **Content Scope:** Verified projects, experience, honors, and leadership from `PORTFOLIO_CONTEXT.md`, `../cv/main.tex`, and the user-approved `Fahmi-mi/jogja-tour-borobudur` repo (`jogjatour-borobudur.com`) (recommended project filters: All / Data Science & AI / Software Eng).
- **Interactive AI Visuals & Scroll Reveals:** Scroll-triggered reveals and compact interactive AI/ML visualizations (neural/system node graphs, conformal bounds, causal uplift bars, pipeline traces) integrate directly inside Hero, About, Experience, and Project cards for rapid recruiter scanability without long sticky-scroll traps.
- **Low-End Device Performance Constraint:** Must deliver smooth scrolling and animations on low-end devices; avoid heavy WebGL/Three.js shaders and expensive CSS blur layers, rely on GPU-composited `transform`/`opacity`, native `position: sticky`, offscreen-paused Canvas 2D (`devicePixelRatio` capped) or crisp SVG, and `prefers-reduced-motion` fallbacks.
- **Privacy & Asset Constraints:** Public site displays Email (`fahmihaqqulihsan@gmail.com`), LinkedIn, GitHub, and CV download only. Do NOT publish phone number (`+62 895-3230-98731`) or personal photo (`../cv/foto.jpeg`) on the public web.
- **Undecided (for design phase):** Visual theme/world (Dark Technical Lab vs. Light Research Paper vs. Hybrid), color palette, typography, and per-section scrollytelling choreography.

## Brand Commitments

- **Identity:** Fahmi Haqqul Ihsan — B.A.Sc. Software Engineering Technology, Universitas Gadjah Mada (July 2024 – Expected July 2028, GPA `3.74/4.00`), Yogyakarta, Indonesia.
- **Public Links:**
  - Email: `fahmihaqqulihsan@gmail.com`
  - LinkedIn: `https://linkedin.com/in/fahmi-haqqul-ihsan-b13276326`
  - GitHub: `https://github.com/Fahmi-mi`

## Evidence on Hand

- **Resume PDF:** `Fahmi Haqqul Ihsan-CV.pdf` (copy/serve from static assets with clean URL when scaffolded).
- **Reference Sources:** `../cv/main.tex` and `PORTFOLIO_CONTEXT.md` (temporary).
- **Verified DS/AI Projects:**
  - *Conformal Hallucination Control & LLM Cost-Quality Router* (`https://github.com/Fahmi-mi/conformal-llm-router`, Nov 2026): `RAGTruth` ($n_{\text{test}}=2,700$) LightGBM + Split Conformal (`MAPIE`) cutting false-accept rate `13.52% -> 4.15%` ($\alpha=0.10$) and `1.96%` ($\alpha=0.05$), Brier `0.1734`; `RouterBench` ($n_{\text{test}}=7,214$) retaining `96.14%` frontier quality (`0.7480` vs `0.7780`) with `8.50%` cost savings (`AUC-QC 0.5206`); OOD `mbpp` ($n=427$) `AUC-QC 0.5148`, `3.07%` savings at $\ge 95\%$ quality. Stack: Python, MAPIE, LightGBM, FastAPI, FAISS, SQLite, SvelteKit, Docker Compose.
  - *Causal Uplift Modeling & Constrained Policy Engine* (`https://github.com/Fahmi-mi/causal-uplift-policy`, Nov 2026): Hillstrom RCT (64k records, `visit`, `$2,500` budget at `$15`/visit & `$0.50`/email), DR-Learner `AUUC 0.0213`, `Qini 0.0368`, `$2,679.37` projected net profit (+75% over naive propensity `$1,529.02`, ~4x random `$679.37`). Stack: Python, EconML, LightGBM, DuckDB, Polars, SciPy/PuLP, FastAPI, Streamlit.
  - *EquiSentinel* (`https://github.com/Fahmi-mi/equisentinel`, Jun–Sep 2026): Event-driven market anomaly detection (`>3%` price, `>5x` volume), 5-stage LangGraph AI worker (DeepSeek, Pydantic, 5-min Redis cache, HITL feedback), 4 Apache Airflow ETL DAGs (`1m/5m/1h` OHLCV, SMA/EMA/RSI/Bollinger, gap filling, `feature_store_ai`). Stack: Python, Go, LangGraph, DeepSeek, Apache Airflow, PostgreSQL 16 + TimescaleDB, NATS JetStream (Protobuf), Redis, SvelteKit.
  - *End-to-End Tabular ML Pipeline* (`https://github.com/Fahmi-mi/end-to-end-ml-pipeline`, Jul 2025–Jun 2026): Python, LightGBM, XGBoost, CatBoost, MLflow, Parquet, pytest.
- **Verified SWE & Tooling Projects:**
  - `glzr` (`https://github.com/Fahmi-mi/glzr`, Svelte) — Terminal-first developer workspace for Linux.
  - `trello-cli` (`https://github.com/Fahmi-mi/trello-cli`, TypeScript, Ink) — Keyboard-driven Trello CLI.
  - `tentang-dental-be` (`https://github.com/Fahmi-mi/tentang-dental-be`, PHP/Laravel) — Clinic CMS & operations REST API with Scramble docs.
  - `snapshoot` (`https://fahmi-mi.github.io/snapshoot/`, CSS/Web) — Virtual photobooth web app with live demo.
- **Verified Experience, Honors & Leadership:**
  - *Smart School Platform* (Freelance, July 2026) — Fullstack & AI Engineer (Laravel Queues, Livewire/Blade, provider-agnostic LLM pipeline, prompt-injection hardening, automated grading sync, `DashboardService` analytics).
  - *Localive Tourist Village Platform* (Freelance, July 2026) — Backend Developer (Laravel REST API, bilingual ID/EN CMS, draft/publish workflows, RBAC, image optimization pipeline).
  - *Jogja Tour Borobudur* (Freelance, February–March 2026) — Fullstack Web Developer (PHP, MySQL, HTML/CSS/JS; live at `https://jogjatour-borobudur.com`, repo `https://github.com/Fahmi-mi/jogja-tour-borobudur`; tour catalog, email inquiry & testimonial REST endpoints, input sanitization, JSON cache fallback on shared hosting, `sitemap.xml` SEO).
  - *Honors:* 3rd Place Winner (National), Data Visualization Competition — Pingfest IT Venture UNS (Oct 2025); 2nd Runner-Up (National), Datathon — RISTEK Fasilkom UI (Sep 2025).
  - *Leadership:* ASSETS UGM — IT Staff, Data Science & AI Division (Tech Dev) (Feb 2026–Present).
- **Explicit Absences:** No portrait photo, no public phone number, no fabricated testimonials, clients, or unverified metrics.

## Product Principles

1. **Evidence Over Hype:** Lead with verified metrics, sample sizes, and real repository/demo links; never invent claims or filler buzzwords.
2. **Integrated Visual Narrative:** Every AI/ML animation and sticky-scroll reveal must explain or reflect the specific system, model, or milestone beside it.
3. **Low-End Device Empathy:** Smooth 60fps scrolling and responsive interaction on modest hardware take precedence over heavy shaders or visual bloat.
4. **Immediate Recruiter Clarity:** Target roles, flagship work, and CV/contact actions must remain effortless to scan and reach at any point.

## Accessibility & Inclusion

Support `prefers-reduced-motion` with clean static fallbacks for all scroll/canvas animations; preserve keyboard navigation, semantic landmarks, and WCAG AA contrast ratios throughout interactive stages.
