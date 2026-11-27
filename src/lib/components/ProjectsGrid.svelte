<script lang="ts">
	import { flip } from 'svelte/animate';
	import ProjectMedia from '$lib/components/ProjectMedia.svelte';
	import {
		FEATURED_PROJECTS,
		SECONDARY_PROJECTS,
		filterFeaturedProjects,
		filterSecondaryProjects,
		type ProjectFilter,
		type ProjectMediaSpec
	} from '$lib/data/portfolio';
	import { getProjectCounts } from '$lib/utils/interactions';

	interface Props {
		externalSelection?: {
			filter: ProjectFilter;
			projectId: string | null;
			seq: number;
		} | null;
	}

	let { externalSelection = null }: Props = $props();

	let activeFilter = $state<ProjectFilter>('all');
	let selectedProjectId = $state<string | null>(null);

	$effect(() => {
		if (!externalSelection) return;
		activeFilter = externalSelection.filter;
		selectedProjectId = externalSelection.projectId;
	});

	// Lock background page scroll while modal dialog is open
	$effect(() => {
		if (typeof document === 'undefined' || !selectedProjectId) return;
		const prevHtmlOverflow = document.documentElement.style.overflow;
		const prevBodyOverflow = document.body.style.overflow;
		document.documentElement.style.overflow = 'hidden';
		document.body.style.overflow = 'hidden';
		return () => {
			document.documentElement.style.overflow = prevHtmlOverflow;
			document.body.style.overflow = prevBodyOverflow;
		};
	});

	interface ArchiveProjectCard {
		id: string;
		title: string;
		categoryLabel: 'Data Science & AI' | 'Software Eng';
		visualVariant: 'conformal' | 'causal' | 'equisentinel' | 'tabular' | 'glzr' | 'trello' | 'api' | 'web';
		media?: ProjectMediaSpec;
		summary: string;
		highlights: string[];
		stack: string[];
		repoUrl: string;
		liveUrl?: string;
	}

	function toArchiveCard(
		p: (typeof FEATURED_PROJECTS)[number] | (typeof SECONDARY_PROJECTS)[number]
	): ArchiveProjectCard {
		const isFeatured = 'highlights' in p;
		return {
			id: p.id,
			title: p.title,
			categoryLabel:
				p.category === 'ds-ai' ? ('Data Science & AI' as const) : ('Software Eng' as const),
			visualVariant: p.visualVariant,
			media: p.media,
			summary: p.summary,
			highlights: isFeatured ? p.highlights : [],
			stack: p.stack,
			repoUrl: p.repoUrl,
			liveUrl: 'liveUrl' in p ? p.liveUrl : undefined
		};
	}

	const allProjects = [...FEATURED_PROJECTS, ...SECONDARY_PROJECTS].map(toArchiveCard);
	const featured = $derived(filterFeaturedProjects(activeFilter));
	const secondary = $derived(filterSecondaryProjects(activeFilter));
	const counts = $derived(getProjectCounts(activeFilter));

	const unifiedProjects = $derived<ArchiveProjectCard[]>([
		...featured.map(toArchiveCard),
		...secondary.map(toArchiveCard)
	]);

	const selectedProject = $derived(
		selectedProjectId ? (allProjects.find((p) => p.id === selectedProjectId) ?? null) : null
	);

	const filters: { id: ProjectFilter; label: string }[] = [
		{ id: 'all', label: 'All (8)' },
		{ id: 'ds-ai', label: 'Data Science & AI (4)' },
		{ id: 'swe', label: 'Software Eng (4)' }
	];
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key === 'Escape' && selectedProjectId) {
			selectedProjectId = null;
		}
	}}
/>

<section id="projects" class="scroll-mt-20 bg-[var(--bg-bone)]">
	<div class="w-full px-6 py-20 sm:px-10 lg:px-14 lg:py-24 xl:px-20">
		<div class="flex flex-col justify-between gap-6 border-b border-[var(--rule)]/70 pb-6 md:flex-row md:items-end">
			<div>
				<h2 class="font-display text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-4xl">
					Selected Projects
				</h2>
				<p class="mt-2 max-w-[66ch] text-base text-[var(--ink-muted)]">
					All {counts.total} repositories in one balanced index. Click any project to inspect benchmarks and architecture.
				</p>
			</div>

			<div class="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
				{#each filters as tab}
					<button
						type="button"
						aria-pressed={activeFilter === tab.id}
						onclick={() => (activeFilter = tab.id)}
						class={`font-mono-tech rounded-full border px-4 py-2 text-xs font-medium transition-all duration-200 ${
							activeFilter === tab.id
								? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--bg-plate)]'
								: 'border-[var(--rule)] bg-white/75 text-[var(--ink-muted)] hover:border-[var(--ink)]'
						}`}
					>
						{tab.label}
					</button>
				{/each}
			</div>
		</div>

		<!-- Borderless editorial 3-column gallery grid -->
		<div class="mt-10 grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
			{#each unifiedProjects as project (project.id)}
				<article id={`project-${project.id}`} animate:flip={{ duration: 300 }} class="scroll-mt-24">
					<button
						type="button"
						onclick={() => (selectedProjectId = project.id)}
						aria-haspopup="dialog"
						class="group flex w-full cursor-pointer flex-col rounded-2xl text-left focus-visible:outline-offset-4"
					>
						<div class="aspect-[16/10] w-full overflow-hidden rounded-2xl shadow-[0_14px_32px_-18px_rgba(17,19,23,0.26)] transition-all duration-300 group-hover:shadow-[0_20px_42px_-18px_rgba(15,118,110,0.26)]">
							<ProjectMedia
								variant={project.visualVariant}
								title={project.title}
								media={project.media}
							/>
						</div>

						<div class="pt-3.5">
							<span class="font-mono-tech block text-[11px] font-semibold text-[var(--teal)]">
								{project.categoryLabel}
							</span>

							<h3 class="font-display mt-1.5 text-base font-bold leading-snug text-[var(--ink)] transition-colors group-hover:text-[var(--teal)] sm:text-lg">
								{project.title}
							</h3>

							<p class="mt-1.5 text-xs leading-relaxed text-[#2A2E35] sm:text-sm">{project.summary}</p>
						</div>
					</button>
				</article>
			{/each}
		</div>
	</div>
</section>

<!-- Centered Liquid Glass Project Detail Modal (no inner scroll, locks page behind) -->
{#if selectedProject}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center overflow-hidden overscroll-none bg-[#111317]/45 p-4 backdrop-blur-sm sm:p-6"
		role="presentation"
		onclick={(e) => {
			if (e.target === e.currentTarget) selectedProjectId = null;
		}}
	>
		<div
			role="dialog"
			aria-modal="true"
			aria-labelledby="project-modal-title"
			class="modal-enter relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/85 bg-[#FAF9F6]/94 p-5 shadow-[0_32px_80px_-20px_rgba(17,19,23,0.45)] backdrop-blur-2xl sm:p-7"
		>
			<div
				class="pointer-events-none absolute -top-24 -right-24 -z-10 h-64 w-64 rounded-full opacity-55 blur-3xl"
				style="background: radial-gradient(circle, rgba(15, 118, 110, 0.22), transparent 70%);"
				aria-hidden="true"
			></div>

			<div class="flex items-center justify-between gap-4 border-b border-[var(--rule)]/80 pb-3">
				<span class="font-mono-tech text-xs font-semibold text-[var(--teal)]">
					{selectedProject.categoryLabel}
				</span>
				<button
					type="button"
					onclick={() => (selectedProjectId = null)}
					class="font-mono-tech cursor-pointer rounded-full border border-[var(--rule)] bg-white/90 px-4 py-1 text-xs font-semibold text-[var(--ink)] transition-colors hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-white"
				>
					Close
				</button>
			</div>

			<div class="mt-5 grid grid-cols-1 items-center gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
				<div class="aspect-[16/9] max-h-[210px] w-full overflow-hidden rounded-2xl shadow-[0_18px_42px_-20px_rgba(17,19,23,0.34)] sm:aspect-[16/10] sm:max-h-none">
					<ProjectMedia
						variant={selectedProject.visualVariant}
						title={selectedProject.title}
						media={selectedProject.media}
					/>
				</div>

				<div class="flex flex-col justify-between">
					<div>
						<h3
							id="project-modal-title"
							class="font-display text-xl font-extrabold tracking-tight text-[var(--ink)] sm:text-2xl"
						>
							{selectedProject.title}
						</h3>

						<p class="mt-2 text-xs leading-relaxed text-[#2A2E35] sm:text-sm">
							{selectedProject.summary}
						</p>

						{#if selectedProject.highlights.length > 0}
							<ul class="mt-3 space-y-1.5 text-xs leading-snug text-[#2A2E35]">
								{#each selectedProject.highlights as bullet}
									<li class="flex items-start gap-2">
										<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--teal)]" aria-hidden="true"></span>
										<span>{bullet}</span>
									</li>
								{/each}
							</ul>
						{/if}

						<div class="mt-4 flex flex-wrap gap-1.5">
							{#each selectedProject.stack as tech}
								<span class="font-mono-tech rounded-full bg-white/90 px-2.5 py-0.5 text-[10.5px] font-medium text-[var(--ink)]">
									{tech}
								</span>
							{/each}
						</div>
					</div>

					<div class="mt-5 flex flex-wrap items-center gap-3 pt-1">
						<a
							href={selectedProject.repoUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="font-mono-tech rounded-full bg-[var(--ink)] px-5 py-2 text-xs font-semibold text-[var(--bg-plate)] transition-colors hover:bg-[var(--teal)]"
						>
							Repository
						</a>
						{#if selectedProject.liveUrl}
							<a
								href={selectedProject.liveUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="font-mono-tech rounded-full bg-[var(--vermilion)] px-5 py-2 text-xs font-semibold text-[var(--bg-plate)] transition-colors hover:bg-[#9A2D16]"
							>
								Live Demo
							</a>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
