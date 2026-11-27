<script lang="ts">
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
		categoryLabel: 'Data Science & AI' | 'Software Eng';
		summary: string;
		keyResult?: string;
		repoUrl: string;
		liveUrl?: string;
	}

	const unifiedProjects = $derived<ArchiveProjectCard[]>([
		...featured.map((p) => ({
			id: p.id,
			title: p.title,
			categoryLabel: 'Data Science & AI' as const,
			summary: p.summary,
			keyResult: p.highlights[0],
			repoUrl: p.repoUrl
		})),
		...secondary.map((p) => ({
			id: p.id,
			title: p.title,
			categoryLabel:
				p.category === 'ds-ai' ? ('Data Science & AI' as const) : ('Software Eng' as const),
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
						class="font-mono-tech rounded-full border px-4 py-2 text-xs font-medium tracking-[0.04em] uppercase transition-colors"
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

		<div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
			{#each unifiedProjects as project (project.id)}
				<article class="flex flex-col justify-between rounded-2xl border border-[var(--rule)] bg-[var(--bg-plate)] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--teal)]/50 sm:p-7">
					<div>
						<h3 class="font-display text-lg font-bold leading-snug text-[var(--ink)] sm:text-xl">
							{project.title}
						</h3>
						<div class="font-mono-tech mt-1.5 text-[11px] font-semibold text-[var(--teal)] uppercase">
							{project.categoryLabel}
						</div>
						<p class="mt-3 text-sm leading-relaxed text-[#2A2E35]">{project.summary}</p>
						{#if project.keyResult}
							<p class="mt-3 rounded-xl bg-[var(--bg-bone)] px-3.5 py-2.5 text-xs leading-relaxed text-[var(--ink-muted)]">
								{project.keyResult}
							</p>
						{/if}
					</div>

					<div class="mt-5 flex flex-wrap items-center gap-3">
						<a
							href={project.repoUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="font-mono-tech inline-block rounded-full border border-[var(--ink)] bg-[var(--bg-bone)] px-4 py-1.5 text-[11px] font-semibold tracking-[0.04em] text-[var(--ink)] uppercase transition-colors hover:bg-[var(--ink)] hover:text-[var(--bg-plate)]"
						>
							Repository
						</a>
						{#if project.liveUrl}
							<a
								href={project.liveUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="font-mono-tech inline-block rounded-full border border-[var(--vermilion)] bg-[var(--vermilion)] px-4 py-1.5 text-[11px] font-semibold tracking-[0.04em] text-[var(--bg-plate)] uppercase transition-colors hover:bg-[#9A2D16]"
							>
								Live Demo
							</a>
						{/if}
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>
