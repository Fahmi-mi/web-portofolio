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

		<!-- Borderless editorial 2-column gallery grid -->
		<div class="mt-12 grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2">
			{#each unifiedProjects as project (project.id)}
				<article id={`project-${project.id}`} animate:flip={{ duration: 300 }} class="group scroll-mt-24 flex flex-col">
					<button
						type="button"
						onclick={() => (selectedProjectId = project.id)}
						aria-haspopup="dialog"
						class="aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-2xl text-left shadow-[0_18px_40px_-22px_rgba(17,19,23,0.28)] transition-all duration-300 group-hover:shadow-[0_24px_48px_-20px_rgba(15,118,110,0.26)]"
					>
						<ProjectMedia
							variant={project.visualVariant}
							title={project.title}
							media={project.media}
						/>
					</button>

					<div class="pt-4">
						<div class="flex flex-wrap items-center justify-between gap-2 font-mono-tech text-[11px]">
							<span class="font-semibold text-[var(--teal)]">
								{project.categoryLabel}
							</span>

							<div class="flex items-center gap-4">
								<button
									type="button"
									onclick={() => (selectedProjectId = project.id)}
									class="cursor-pointer font-medium text-[var(--ink)] transition-colors hover:text-[var(--teal)]"
								>
									Inspect
								</button>
								<a
									href={project.repoUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="font-medium text-[var(--ink)] transition-colors hover:text-[var(--teal)] hover:underline"
								>
									Repository
								</a>
								{#if project.liveUrl}
									<a
										href={project.liveUrl}
										target="_blank"
										rel="noopener noreferrer"
										class="font-semibold text-[var(--vermilion)] transition-colors hover:underline"
									>
										Live Demo
									</a>
								{/if}
							</div>
						</div>

						<h3 class="font-display mt-2 text-lg font-bold leading-snug text-[var(--ink)] sm:text-xl">
							<button
								type="button"
								onclick={() => (selectedProjectId = project.id)}
								class="cursor-pointer text-left transition-colors hover:text-[var(--teal)]"
							>
								{project.title}
							</button>
						</h3>

						<p class="mt-2 text-sm leading-relaxed text-[#2A2E35]">{project.summary}</p>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<!-- Centered Liquid Glass Project Detail Modal -->
{#if selectedProject}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-[#111317]/45 p-4 backdrop-blur-sm sm:p-6"
		role="presentation"
		onclick={(e) => {
			if (e.target === e.currentTarget) selectedProjectId = null;
		}}
	>
		<div
			role="dialog"
			aria-modal="true"
			aria-labelledby="project-modal-title"
			class="modal-enter relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/85 bg-[#FAF9F6]/92 p-6 shadow-[0_32px_80px_-20px_rgba(17,19,23,0.45)] backdrop-blur-2xl sm:p-8"
		>
			<div
				class="pointer-events-none absolute -top-24 -right-24 -z-10 h-64 w-64 rounded-full opacity-55 blur-3xl"
				style="background: radial-gradient(circle, rgba(15, 118, 110, 0.22), transparent 70%);"
				aria-hidden="true"
			></div>

			<div class="flex items-center justify-between gap-4 border-b border-[var(--rule)]/80 pb-4">
				<span class="font-mono-tech text-xs font-semibold text-[var(--teal)]">
					{selectedProject.categoryLabel}
				</span>
				<button
					type="button"
					onclick={() => (selectedProjectId = null)}
					class="font-mono-tech cursor-pointer rounded-full border border-[var(--rule)] bg-white/90 px-4 py-1.5 text-xs font-semibold text-[var(--ink)] transition-colors hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-white"
				>
					Close
				</button>
			</div>

			<div class="mt-6 grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
				<div class="aspect-[16/10] w-full overflow-hidden rounded-2xl shadow-[0_18px_42px_-20px_rgba(17,19,23,0.34)]">
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
							class="font-display text-2xl font-extrabold tracking-tight text-[var(--ink)] sm:text-3xl"
						>
							{selectedProject.title}
						</h3>

						<p class="mt-3 text-sm leading-relaxed text-[#2A2E35] sm:text-base">
							{selectedProject.summary}
						</p>

						{#if selectedProject.highlights.length > 0}
							<ul class="mt-4 space-y-2 text-xs leading-relaxed text-[#2A2E35] sm:text-sm">
								{#each selectedProject.highlights as bullet}
									<li class="flex items-start gap-2.5">
										<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--teal)]" aria-hidden="true"></span>
										<span>{bullet}</span>
									</li>
								{/each}
							</ul>
						{/if}

						<div class="mt-5 flex flex-wrap gap-1.5">
							{#each selectedProject.stack as tech}
								<span class="font-mono-tech rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-[var(--ink)]">
									{tech}
								</span>
							{/each}
						</div>
					</div>

					<div class="mt-6 flex flex-wrap items-center gap-3 pt-2">
						<a
							href={selectedProject.repoUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="font-mono-tech rounded-full bg-[var(--ink)] px-5 py-2.5 text-xs font-semibold text-[var(--bg-plate)] transition-colors hover:bg-[var(--teal)]"
						>
							Repository
						</a>
						{#if selectedProject.liveUrl}
							<a
								href={selectedProject.liveUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="font-mono-tech rounded-full bg-[var(--vermilion)] px-5 py-2.5 text-xs font-semibold text-[var(--bg-plate)] transition-colors hover:bg-[#9A2D16]"
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
