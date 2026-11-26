<script lang="ts">
	import ProjectCardVisual from '$lib/components/ProjectCardVisual.svelte';
	import {
		filterFeaturedProjects,
		filterSecondaryProjects,
		type ProjectFilter
	} from '$lib/data/portfolio';
	import { getProjectCounts } from '$lib/utils/interactions';

	let activeFilter = $state<ProjectFilter>('all');

	const featured = $derived(filterFeaturedProjects(activeFilter));
	const secondary = $derived(filterSecondaryProjects(activeFilter));
	const counts = $derived(getProjectCounts(activeFilter));

	interface ArchiveProjectCard {
		id: string;
		title: string;
		badge: string;
		period: string;
		visualVariant:
			| 'conformal'
			| 'causal'
			| 'equisentinel'
			| 'tabular'
			| 'glzr'
			| 'trello'
			| 'api'
			| 'web';
		summary: string;
		keyResult?: string;
		stack: string[];
		repoUrl: string;
		liveUrl?: string;
	}

	const unifiedProjects = $derived<ArchiveProjectCard[]>([
		...featured.map((p) => ({
			id: p.id,
			title: p.title,
			badge: `${p.code} | Data Science & AI`,
			period: p.period,
			visualVariant: p.visualVariant,
			summary: p.summary,
			keyResult: p.highlights[0],
			stack: p.stack,
			repoUrl: p.repoUrl
		})),
		...secondary.map((p) => ({
			id: p.id,
			title: p.title,
			badge: p.category === 'ds-ai' ? 'Data Science & AI' : 'Software Eng',
			period: p.period,
			visualVariant: p.visualVariant,
			summary: p.summary,
			stack: p.stack,
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
	<div class="w-full px-6 py-16 sm:px-10 lg:px-14 lg:py-20 xl:px-20">
		<div class="flex flex-col justify-between gap-6 border-b border-[var(--ink)] pb-6 md:flex-row md:items-end">
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
						onclick={() => (activeFilter = tab.id)}
						class="font-mono-tech border px-3.5 py-2 text-xs font-medium tracking-[0.04em] uppercase transition-colors"
						class:border-[var(--ink)]={activeFilter === tab.id}
						class:bg-[var(--ink)]={activeFilter === tab.id}
						class:text-[var(--bg-plate)]={activeFilter === tab.id}
						class:border-[var(--rule)]={activeFilter !== tab.id}
						class:bg-[var(--bg-plate)]={activeFilter !== tab.id}
						class:text-[var(--ink)]={activeFilter !== tab.id}
					>
						{tab.label}
					</button>
				{/each}
			</div>
		</div>

		<div class="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
			{#each unifiedProjects as project (project.id)}
				<article class="flex flex-col justify-between border border-[var(--rule)] bg-[var(--bg-plate)] transition-colors duration-200 hover:border-[var(--ink)]">
					<div>
						<ProjectCardVisual variant={project.visualVariant} />
						<div class="p-5 sm:p-6">
							<h3 class="font-display text-lg font-bold leading-snug text-[var(--ink)] sm:text-xl">
								{project.title}
							</h3>
							<div class="font-mono-tech mt-1.5 flex items-center justify-between gap-2 text-[11px] text-[var(--ink-muted)] uppercase">
								<span class="font-semibold text-[var(--teal)]">{project.badge}</span>
								<span>{project.period}</span>
							</div>
							<p class="mt-3 text-sm leading-relaxed text-[#2A2E35]">{project.summary}</p>
							{#if project.keyResult}
								<p class="mt-3 border-l border-[var(--rule)] pl-3 text-xs leading-relaxed text-[var(--ink-muted)]">
									{project.keyResult}
								</p>
							{/if}
						</div>
					</div>

					<div class="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--rule)] px-5 py-3.5 sm:px-6">
						<div class="flex flex-wrap gap-1.5">
							{#each project.stack as tech}
								<span class="font-mono-tech border border-[var(--rule)] bg-[var(--bg-bone)] px-2 py-0.5 text-[11px] text-[var(--ink)]">
									{tech}
								</span>
							{/each}
						</div>
						<div class="flex items-center gap-4">
							{#if project.liveUrl}
								<a
									href={project.liveUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="font-mono-tech border-b border-[var(--vermilion)] pb-0.5 text-xs font-semibold text-[var(--vermilion)] uppercase"
								>
									Live Demo
								</a>
							{/if}
							<a
								href={project.repoUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="font-mono-tech border-b border-[var(--ink)] pb-0.5 text-xs font-semibold text-[var(--ink)] uppercase hover:border-[var(--teal)] hover:text-[var(--teal)]"
							>
								Repository
							</a>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>
