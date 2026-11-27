<script lang="ts">
	import { flip } from 'svelte/animate';
	import ProjectMedia from '$lib/components/ProjectMedia.svelte';
	import {
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
	let highlightedProjectId = $state<string | null>(null);

	$effect(() => {
		if (!externalSelection) return;
		activeFilter = externalSelection.filter;
		highlightedProjectId = externalSelection.projectId;
	});

	interface ArchiveProjectCard {
		id: string;
		title: string;
		categoryLabel: 'Data Science & AI' | 'Software Eng';
		visualVariant: 'conformal' | 'causal' | 'equisentinel' | 'tabular' | 'glzr' | 'trello' | 'api' | 'web';
		media?: ProjectMediaSpec;
		summary: string;
		keyResult?: string;
		repoUrl: string;
		liveUrl?: string;
	}

	const featured = $derived(filterFeaturedProjects(activeFilter));
	const secondary = $derived(filterSecondaryProjects(activeFilter));
	const counts = $derived(getProjectCounts(activeFilter));

	const unifiedProjects = $derived<ArchiveProjectCard[]>([
		...featured.map((p) => ({
			id: p.id,
			title: p.title,
			categoryLabel: 'Data Science & AI' as const,
			visualVariant: p.visualVariant,
			media: p.media,
			summary: p.summary,
			keyResult: p.highlights[0],
			repoUrl: p.repoUrl
		})),
		...secondary.map((p) => ({
			id: p.id,
			title: p.title,
			categoryLabel:
				p.category === 'ds-ai' ? ('Data Science & AI' as const) : ('Software Eng' as const),
			visualVariant: p.visualVariant,
			media: p.media,
			summary: p.summary,
			repoUrl: p.repoUrl,
			liveUrl: p.liveUrl
		}))
	]);

	const filters: { id: ProjectFilter; label: string }[] = [
		{ id: 'all', label: 'All (8)' },
		{ id: 'ds-ai', label: 'Data Science & AI (4)' },
		{ id: 'swe', label: 'Software Eng (4)' }
	];
</script>

<section id="projects" class="scroll-mt-16 border-b border-[var(--rule)] bg-[var(--bg-bone)]">
	<div class="w-full px-6 py-20 sm:px-10 lg:px-14 lg:py-24 xl:px-20">
		<div class="flex flex-col justify-between gap-6 border-b border-[var(--rule)] pb-6 md:flex-row md:items-end">
			<div>
				<h2 class="font-display text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-4xl">
					Selected Projects
				</h2>
				<p class="mt-2 max-w-[66ch] text-base text-[var(--ink-muted)]">
					All {counts.total} repositories in one balanced index across Data Science, AI systems, backend APIs, and open-source developer tools.
				</p>
			</div>

			<div class="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
				{#each filters as tab}
					<button
						type="button"
						aria-pressed={activeFilter === tab.id}
						onclick={() => {
							activeFilter = tab.id;
							highlightedProjectId = null;
						}}
						class="font-mono-tech rounded-full border px-4 py-2 text-xs font-medium transition-colors"
						class:border-[var(--ink)]={activeFilter === tab.id}
						class:bg-[var(--ink)]={activeFilter === tab.id}
						class:text-[var(--bg-plate)]={activeFilter === tab.id}
						class:border-[var(--rule)]={activeFilter !== tab.id}
						class:bg-[var(--bg-plate)]={activeFilter !== tab.id}
						class:text-[var(--ink-muted)]={activeFilter !== tab.id}
					>
						{tab.label}
					</button>
				{/each}
			</div>
		</div>

		<!-- Borderless editorial media-first grid -->
		<div class="mt-12 grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2">
			{#each unifiedProjects as project (project.id)}
				<article
					id={`project-${project.id}`}
					animate:flip={{ duration: 280 }}
					class="group scroll-mt-24 flex flex-col"
				>
					<div
						class="aspect-[16/10] w-full overflow-hidden rounded-2xl shadow-[0_18px_40px_-22px_rgba(17,19,23,0.28)] transition-all duration-300"
						class:ring-2={highlightedProjectId === project.id}
						class:ring-[var(--teal)]={highlightedProjectId === project.id}
						class:ring-offset-4={highlightedProjectId === project.id}
						class:ring-offset-[var(--bg-bone)]={highlightedProjectId === project.id}
					>
						<ProjectMedia
							variant={project.visualVariant}
							title={project.title}
							media={project.media}
						/>
					</div>

					<div class="pt-4">
						<div class="flex flex-wrap items-center justify-between gap-2 font-mono-tech text-[11px]">
							<span class="font-semibold text-[var(--teal)]">
								{project.categoryLabel}
							</span>

							<div class="flex items-center gap-4">
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
							{project.title}
						</h3>

						<p class="mt-2 text-sm leading-relaxed text-[#2A2E35]">{project.summary}</p>
						{#if project.keyResult}
							<p class="mt-2 text-xs leading-relaxed text-[var(--ink-muted)]">
								{project.keyResult}
							</p>
						{/if}
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>
