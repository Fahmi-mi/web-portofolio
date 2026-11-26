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

	const filters: { id: ProjectFilter; label: string }[] = [
		{ id: 'all', label: 'All (8)' },
		{ id: 'ds-ai', label: 'Data Science & AI (4)' },
		{ id: 'swe', label: 'Software Eng (4)' }
	];
</script>

<section id="projects" class="border-b border-[var(--rule)] bg-[var(--bg-bone)]">
	<div class="mx-auto max-w-[1360px] px-5 py-16 sm:px-8 lg:py-20">
		<div class="flex flex-col justify-between gap-6 border-b border-[var(--ink)] pb-6 md:flex-row md:items-end">
			<div>
				<h2 class="font-display text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-4xl">
					Selected Projects
				</h2>
				<p class="mt-2 max-w-[62ch] text-base text-[var(--ink-muted)]">
					All {counts.total} verified projects visible in one scannable index: flagship DS/AI specimens with inline interactive proofs alongside software engineering tools.
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

		{#if featured.length > 0}
			<div class="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
				{#each featured as project (project.id)}
					<article class="flex flex-col justify-between border border-[var(--ink)] bg-[var(--bg-plate)]">
						<div>
							<ProjectCardVisual variant={project.visualVariant} />
							<div class="p-5 sm:p-6">
								<div class="font-mono-tech flex items-center justify-between text-[11px] text-[var(--ink-muted)] uppercase">
									<span class="font-semibold text-[var(--teal)]">{project.code}</span>
									<span>{project.period}</span>
								</div>
								<h3 class="font-display mt-2 text-xl font-bold leading-snug text-[var(--ink)]">
									{project.title}
								</h3>
								<p class="mt-2.5 text-sm leading-relaxed text-[#2A2E35]">{project.summary}</p>
								<ul class="mt-4 space-y-2 border-t border-[var(--rule)] pt-3.5 text-sm leading-relaxed text-[var(--ink-muted)]">
									{#each project.highlights as item}
										<li class="border-l border-[var(--rule)] pl-3">{item}</li>
									{/each}
								</ul>
							</div>
						</div>

						<div class="border-t border-[var(--rule)] px-5 py-4 sm:px-6">
							<div class="flex flex-wrap gap-1.5">
								{#each project.stack as tech}
									<span class="font-mono-tech border border-[var(--rule)] bg-[var(--bg-bone)] px-2 py-0.5 text-[11px] text-[var(--ink)]">
										{tech}
									</span>
								{/each}
							</div>
							<div class="mt-3.5">
								<a
									href={project.repoUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="font-mono-tech inline-block border-b border-[var(--ink)] pb-0.5 text-xs font-semibold text-[var(--ink)] uppercase hover:border-[var(--teal)] hover:text-[var(--teal)]"
								>
									GitHub Repository
								</a>
							</div>
						</div>
					</article>
				{/each}
			</div>
		{/if}

		{#if secondary.length > 0}
			<div class="mt-10">
				<div class="font-mono-tech mb-4 text-xs font-semibold tracking-[0.06em] text-[var(--ink-muted)] uppercase">
					{activeFilter === 'swe'
						? 'Software Engineering & Tooling'
						: 'Additional ML & Software Engineering Work'}
				</div>
				<div class="grid grid-cols-1 gap-5 md:grid-cols-2">
					{#each secondary as project (project.id)}
						<article class="flex flex-col justify-between border border-[var(--rule)] bg-[var(--bg-plate)]">
							<div>
								<ProjectCardVisual variant={project.visualVariant} />
								<div class="p-5">
									<div class="font-mono-tech flex items-center justify-between text-[11px] text-[var(--ink-muted)] uppercase">
										<span class="text-[var(--teal)]">
											{project.category === 'ds-ai' ? 'Data Science & AI' : 'Software Eng'}
										</span>
										<span>{project.period}</span>
									</div>
									<h3 class="font-display mt-1.5 text-lg font-bold text-[var(--ink)]">
										{project.title}
									</h3>
									<p class="mt-2 text-sm leading-relaxed text-[var(--ink-muted)]">
										{project.summary}
									</p>
								</div>
							</div>

							<div class="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--rule)] px-5 py-3.5">
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
		{/if}
	</div>
</section>
