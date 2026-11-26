<script lang="ts">
	import { EXPERIENCE_ITEMS, HONOR_ITEMS, LEADERSHIP_ITEM } from '$lib/data/portfolio';

	let expandedExpIndex = $state<number | null>(0);

	// Svelte action tracking per-card cursor coordinates for smooth spotlight sheen without global jank.
	function spotlight(node: HTMLElement, spotColor = 'rgba(15, 118, 110, 0.08)') {
		node.style.setProperty('--spot-color', spotColor);
		const onMove = (e: PointerEvent) => {
			const rect = node.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			node.style.setProperty('--spot-x', `${x}px`);
			node.style.setProperty('--spot-y', `${y}px`);
			node.style.setProperty('--spot-opacity', '1');
		};
		const onLeave = () => {
			node.style.setProperty('--spot-opacity', '0');
		};
		node.addEventListener('pointermove', onMove, { passive: true });
		node.addEventListener('pointerleave', onLeave);
		return {
			destroy() {
				node.removeEventListener('pointermove', onMove);
				node.removeEventListener('pointerleave', onLeave);
			}
		};
	}
</script>

<section id="experience" class="scroll-mt-16 border-b border-[var(--rule)]/80">
	<div class="w-full px-6 py-20 sm:px-10 lg:px-14 lg:py-24 xl:px-20">
		<div class="flex flex-col justify-between gap-4 border-b border-[var(--rule)] pb-6 md:flex-row md:items-end">
			<div>
				<h2 class="font-display text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-4xl">
					Experience &amp; Honors
				</h2>
				<p class="mt-2 max-w-[65ch] text-base text-[var(--ink-muted)]">
					Client production platforms, technical mentorship at UGM, and competition awards.
				</p>
			</div>
			<span class="font-mono-tech rounded-full border border-[var(--rule)] bg-[var(--bg-plate)] px-3.5 py-1.5 text-xs text-[var(--ink-muted)]">
				3 Client Systems / 2 Honors / 1 Mentorship
			</span>
		</div>

		<!-- Upper Bento Row: 3 Interactive Expandable Spotlight Experience Cards -->
		<div class="mt-10 grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
			{#each EXPERIENCE_ITEMS as item, idx}
				{@const isExpanded = expandedExpIndex === idx}
				<article
					use:spotlight={'rgba(15, 118, 110, 0.08)'}
					class="spotlight-card flex flex-col justify-between rounded-2xl border bg-[var(--bg-plate)] p-6 transition-all duration-300 sm:p-7"
					class:border-[var(--teal)]={isExpanded}
					class:border-[var(--rule)]={!isExpanded}
				>
					<div>
						<div class="flex flex-wrap items-center justify-between gap-2">
							<span class="font-mono-tech rounded-full bg-[var(--bg-bone)] px-3 py-1 text-[11px] font-semibold text-[var(--teal)]">
								{item.period}
							</span>
							<span class="font-mono-tech text-[11px] text-[var(--ink-muted)]">
								{item.location}
							</span>
						</div>

						<h3 class="font-display mt-4 text-xl font-bold text-[var(--ink)]">
							{item.organization}
						</h3>
						<div class="mt-1 text-sm font-medium text-[var(--ink-muted)]">
							{item.role}
						</div>

						<p class="mt-4 text-sm leading-relaxed text-[#2A2E35]">
							{item.highlights[0]}
						</p>

						{#if isExpanded && item.highlights.length > 1}
							<div class="mt-3 space-y-2 border-t border-[var(--rule)] pt-3 text-sm leading-relaxed text-[var(--ink-muted)]">
								{#each item.highlights.slice(1) as extra}
									<p>{extra}</p>
								{/each}
							</div>
						{/if}
					</div>

					<div class="mt-5 flex flex-wrap items-center justify-between gap-3">
						<div class="flex flex-wrap items-center gap-2">
							{#if item.highlights.length > 1}
								<button
									type="button"
									aria-expanded={isExpanded}
									onclick={() => (expandedExpIndex = isExpanded ? null : idx)}
									class="font-mono-tech rounded-full border border-[var(--rule)] bg-[var(--bg-bone)] px-3.5 py-1.5 text-[11px] font-medium text-[var(--ink)] transition-colors hover:border-[var(--ink)]"
								>
									{isExpanded ? 'Less detail' : 'More detail'}
								</button>
							{/if}
						</div>

						{#if item.liveUrl || item.repoUrl}
							<div class="flex items-center gap-2">
								{#if item.liveUrl}
									<a
										href={item.liveUrl}
										target="_blank"
										rel="noopener noreferrer"
										class="font-mono-tech rounded-full bg-[var(--vermilion)] px-3.5 py-1.5 text-[11px] font-semibold text-[var(--bg-plate)] transition-colors hover:bg-[#9A2D16]"
									>
										Live Site
									</a>
								{/if}
								{#if item.repoUrl}
									<a
										href={item.repoUrl}
										target="_blank"
										rel="noopener noreferrer"
										class="font-mono-tech rounded-full border border-[var(--rule)] bg-[var(--bg-bone)] px-3.5 py-1.5 text-[11px] font-semibold text-[var(--ink)] transition-colors hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--bg-plate)]"
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

		<!-- Lower Bento Row: Honors Podiums + ASSETS UGM Spotlight Cards -->
		<div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
			{#each HONOR_ITEMS as honor, idx}
				<article
					use:spotlight={idx === 0 ? 'rgba(184, 56, 30, 0.08)' : 'rgba(15, 118, 110, 0.08)'}
					class="spotlight-card flex flex-col justify-between rounded-2xl border border-[var(--rule)] bg-[var(--bg-plate)] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--ink)]/30 sm:p-7"
				>
					<div>
						<div class="flex items-center justify-between gap-2">
							<span
								class="font-mono-tech rounded-full bg-[var(--bg-bone)] px-3 py-1 text-[11px] font-semibold"
								class:text-[var(--vermilion)]={idx === 0}
								class:text-[var(--teal)]={idx !== 0}
							>
								{honor.date}
							</span>
							<span class="font-mono-tech text-[11px] text-[var(--ink-muted)]">Honor</span>
						</div>
						<div
							class="font-display mt-4 text-4xl font-extrabold tracking-tight"
							class:text-[var(--vermilion)]={idx === 0}
							class:text-[var(--teal)]={idx !== 0}
						>
							{honor.rank}
						</div>
						<h3 class="font-display mt-2 text-lg font-bold leading-snug text-[var(--ink)]">
							{honor.title}
						</h3>
					</div>
					<div class="font-mono-tech mt-4 text-xs text-[var(--ink-muted)]">
						{honor.organizer}
					</div>
				</article>
			{/each}

			<article
				use:spotlight={'rgba(15, 118, 110, 0.08)'}
				class="spotlight-card flex flex-col justify-between rounded-2xl border border-[var(--rule)] bg-[var(--bg-plate)] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--ink)]/30 sm:p-7"
			>
				<div>
					<div class="flex items-center justify-between gap-2">
						<span class="font-mono-tech rounded-full bg-[var(--bg-bone)] px-3 py-1 text-[11px] font-semibold text-[var(--teal)]">
							{LEADERSHIP_ITEM.period}
						</span>
						<span class="font-mono-tech flex items-center gap-1.5 text-[11px] text-[var(--teal)]">
							<span class="h-2 w-2 rounded-full bg-[var(--teal)]" aria-hidden="true"></span>
							Active
						</span>
					</div>
					<h3 class="font-display mt-4 text-xl font-bold text-[var(--ink)]">
						{LEADERSHIP_ITEM.organization}
					</h3>
					<div class="mt-1 text-sm font-medium text-[var(--ink-muted)]">
						{LEADERSHIP_ITEM.role}
					</div>
					<p class="mt-3 text-sm leading-relaxed text-[#2A2E35]">
						{LEADERSHIP_ITEM.highlights[0]}
					</p>
				</div>
				<div class="font-mono-tech mt-4 text-xs text-[var(--ink-muted)]">
					{LEADERSHIP_ITEM.location}
				</div>
			</article>
		</div>
	</div>
</section>
