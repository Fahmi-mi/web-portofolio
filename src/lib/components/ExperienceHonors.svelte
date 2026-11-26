<script lang="ts">
	import { EXPERIENCE_ITEMS, HONOR_ITEMS, LEADERSHIP_ITEM } from '$lib/data/portfolio';
</script>

<section id="experience" class="border-b border-[var(--rule)] bg-[var(--bg-plate)]">
	<div class="w-full px-6 py-16 sm:px-10 lg:px-14 lg:py-20 xl:px-20">
		<div class="border-b border-[var(--ink)] pb-6">
			<h2 class="font-display text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-4xl">
				Experience &amp; National Honors
			</h2>
			<p class="mt-2 max-w-[65ch] text-base text-[var(--ink-muted)]">
				Production client deployments, national data science podiums, and technical mentorship at UGM.
			</p>
		</div>

		<div class="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr]">
			<div class="divide-y divide-[var(--rule)] border-t border-b border-[var(--rule)]">
				{#each EXPERIENCE_ITEMS as item}
					<article class="py-6 first:pt-5 last:pb-5">
						<div class="flex flex-wrap items-baseline justify-between gap-2">
							<h3 class="font-display text-xl font-bold text-[var(--ink)]">
								{item.organization}
							</h3>
							<span class="font-mono-tech text-xs text-[var(--teal)]">{item.period}</span>
						</div>
						<div class="font-mono-tech mt-1 text-xs text-[var(--ink-muted)]">
							{item.role} | {item.location}
						</div>

						<ul class="mt-3.5 space-y-2 text-sm leading-relaxed text-[#2A2E35]">
							{#each item.highlights as point}
								<li class="border-l border-[var(--rule)] pl-3">{point}</li>
							{/each}
						</ul>

						<div class="mt-4 flex flex-wrap items-center justify-between gap-3">
							<div class="flex flex-wrap gap-1.5">
								{#each item.stack as tech}
									<span class="font-mono-tech border border-[var(--rule)] bg-[var(--bg-bone)] px-2 py-0.5 text-[11px] text-[var(--ink)]">
										{tech}
									</span>
								{/each}
							</div>

							{#if item.liveUrl || item.repoUrl}
								<div class="flex items-center gap-4">
									{#if item.liveUrl}
										<a
											href={item.liveUrl}
											target="_blank"
											rel="noopener noreferrer"
											class="font-mono-tech border-b border-[var(--vermilion)] pb-0.5 text-xs font-semibold text-[var(--vermilion)] uppercase"
										>
											Live Site
										</a>
									{/if}
									{#if item.repoUrl}
										<a
											href={item.repoUrl}
											target="_blank"
											rel="noopener noreferrer"
											class="font-mono-tech border-b border-[var(--ink)] pb-0.5 text-xs font-semibold text-[var(--ink)] uppercase hover:border-[var(--teal)] hover:text-[var(--teal)]"
										>
											Repository
										</a>
									{/if}
								</div>
							{/if}
						</div>
					</article>
				{/each}
			</div>

			<div class="flex flex-col gap-6">
				<div class="bg-[var(--vitrine)] p-5 text-[var(--vitrine-ink)]">
					<div class="font-mono-tech text-[11px] font-semibold tracking-[0.08em] text-[var(--vitrine-ok)] uppercase">
						Production Architecture Lifecycle
					</div>
					<div class="mt-3 space-y-2.5 font-mono-tech text-xs leading-relaxed">
						<div>
							<span class="text-[var(--vitrine-ok)]">[smart-school]</span>
							<span class="text-[#D5DBE3]"> Laravel Queues + Prompt-Injection Guard + DashboardService</span>
						</div>
						<div>
							<span class="text-[var(--vitrine-ok)]">[localive-api]</span>
							<span class="text-[#D5DBE3]"> Bilingual ID/EN CMS + RBAC + Image Pipeline</span>
						</div>
						<div>
							<span class="text-[var(--vitrine-alert)]">[jogja-tour]</span>
							<span class="text-[#D5DBE3]"> PHP/MySQL + cache/testimoni.json Failover</span>
						</div>
					</div>
				</div>

				<div class="border border-[var(--ink)] bg-[var(--bg-bone)] p-5">
					<div class="flex items-center justify-between border-b border-[var(--rule)] pb-3">
						<span class="font-mono-tech text-xs font-semibold tracking-[0.05em] text-[var(--ink)] uppercase">
							National Competitions
						</span>
						<span class="font-mono-tech text-xs text-[var(--teal)]">2x National Top 3</span>
					</div>

					<svg
						viewBox="0 0 340 68"
						class="mt-4 h-auto w-full border border-[var(--rule)] bg-[var(--bg-plate)] p-2"
						role="img"
						aria-label="National competition placements timeline"
					>
						<line x1="20" y1="42" x2="320" y2="42" stroke="#D8D4CA" stroke-width="1.5" />
						<line x1="20" y1="42" x2="275" y2="42" stroke="#0F766E" stroke-width="2.5" />
						<circle cx="95" cy="42" r="6" fill="#0F766E" />
						<circle cx="245" cy="42" r="6" fill="#B8381E" />
						<text x="54" y="22" font-family="JetBrains Mono" font-size="9.5" fill="#111317">
							Sep 2025: UI Datathon
						</text>
						<text x="200" y="22" font-family="JetBrains Mono" font-size="9.5" fill="#111317">
							Oct 2025: UNS Data Viz
						</text>
					</svg>

					<div class="mt-4 space-y-3.5">
						{#each HONOR_ITEMS as honor}
							<div class="border-t border-[var(--rule)] pt-3 first:border-t-0 first:pt-0">
								<div class="font-display text-sm font-bold text-[var(--ink)]">
									{honor.title}
								</div>
								<div class="font-mono-tech mt-0.5 text-xs text-[var(--ink-muted)]">
									{honor.organizer} | {honor.date}
								</div>
							</div>
						{/each}
					</div>
				</div>

				<div class="border border-[var(--rule)] bg-[var(--bg-bone)] p-5">
					<div class="flex items-baseline justify-between gap-2">
						<h3 class="font-display text-base font-bold text-[var(--ink)]">
							{LEADERSHIP_ITEM.organization}
						</h3>
						<span class="font-mono-tech text-xs text-[var(--teal)]">
							{LEADERSHIP_ITEM.period}
						</span>
					</div>
					<div class="font-mono-tech mt-1 text-xs text-[var(--ink-muted)]">
						{LEADERSHIP_ITEM.role}
					</div>
					<ul class="mt-3 space-y-1.5 text-sm leading-relaxed text-[#2A2E35]">
						{#each LEADERSHIP_ITEM.highlights as item}
							<li>{item}</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</div>
</section>
