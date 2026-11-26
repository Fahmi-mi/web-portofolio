<script lang="ts">
	import { PROFILE, SKILL_GROUPS } from '$lib/data/portfolio';
	import { copyEmailSafely } from '$lib/utils/interactions';

	let copyState = $state<'idle' | 'copied' | 'fallback'>('idle');

	async function handleCopyEmail() {
		const clipboard = typeof navigator !== 'undefined' ? navigator.clipboard : undefined;
		copyState = await copyEmailSafely(PROFILE.email, clipboard);
	}
</script>

<section id="skills" class="border-b border-[var(--rule)] bg-[var(--bg-bone)]">
	<div class="mx-auto max-w-[1360px] px-5 py-16 sm:px-8 lg:py-20">
		<div class="border-b border-[var(--ink)] pb-6">
			<h2 class="font-display text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-4xl">
				Technical Stack
			</h2>
			<p class="mt-2 max-w-[62ch] text-base text-[var(--ink-muted)]">
				Core languages, statistical ML tooling, and production data infrastructure.
			</p>
		</div>

		<div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
			{#each SKILL_GROUPS as group}
				<div class="border border-[var(--rule)] bg-[var(--bg-plate)] p-5">
					<h3 class="font-mono-tech border-b border-[var(--rule)] pb-2.5 text-xs font-semibold tracking-[0.06em] text-[var(--teal)] uppercase">
						{group.category}
					</h3>
					<div class="mt-4 flex flex-wrap gap-2">
						{#each group.items as skill}
							<span class="font-mono-tech border border-[var(--rule)] bg-[var(--bg-bone)] px-2.5 py-1 text-xs text-[var(--ink)]">
								{skill}
							</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<footer id="contact" class="bg-[var(--vitrine)] text-[var(--vitrine-ink)]">
	<div class="mx-auto max-w-[1360px] px-5 py-14 sm:px-8 lg:py-16">
		<div class="grid grid-cols-1 gap-8 border-b border-slate-800 pb-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
			<div>
				<h2 class="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
					Available for Internship
				</h2>
				<p class="mt-3 max-w-[60ch] text-base leading-relaxed text-slate-300">
					Seeking next-semester internship opportunities in {PROFILE.primaryRole} (primary) and
					{PROFILE.secondaryRole} (secondary). Reach out via email or inspect repositories directly.
				</p>
			</div>

			<div class="flex flex-wrap items-center gap-3 lg:justify-end">
				<button
					type="button"
					onclick={handleCopyEmail}
					class="font-mono-tech border border-[var(--vitrine-ok)] bg-[var(--vitrine-ok)] px-4 py-2.5 text-xs font-semibold tracking-[0.04em] text-[#09120E] uppercase transition-colors hover:bg-emerald-300"
				>
					{#if copyState === 'copied'}
						Email Copied
					{:else if copyState === 'fallback'}
						Use Mail Link Below
					{:else}
						Copy Email
					{/if}
				</button>
				<span class="sr-only" aria-live="polite">
					{#if copyState === 'copied'}
						Email address copied to clipboard.
					{:else if copyState === 'fallback'}
						Clipboard unavailable; use the direct mail link below.
					{/if}
				</span>
				<a
					href={`mailto:${PROFILE.email}`}
					class="font-mono-tech border border-slate-600 px-4 py-2.5 text-xs font-medium tracking-[0.04em] text-white uppercase transition-colors hover:border-white"
				>
					Send Email
				</a>
				<a
					href={PROFILE.cvPath}
					download={PROFILE.cvDownloadName}
					class="font-mono-tech border border-white bg-white px-4 py-2.5 text-xs font-semibold tracking-[0.04em] text-[var(--vitrine)] uppercase transition-colors hover:bg-slate-200"
				>
					Download CV.pdf
				</a>
			</div>
		</div>

		<div class="mt-6 flex flex-col justify-between gap-4 font-mono-tech text-xs text-[var(--vitrine-muted)] sm:flex-row sm:items-center">
			<div class="flex flex-wrap gap-6">
				<a href={`mailto:${PROFILE.email}`} class="text-slate-200 hover:text-[var(--vitrine-ok)]">
					{PROFILE.email}
				</a>
				<a
					href={PROFILE.github}
					target="_blank"
					rel="noopener noreferrer"
					class="text-slate-200 hover:text-[var(--vitrine-ok)]"
				>
					GitHub
				</a>
				<a
					href={PROFILE.linkedin}
					target="_blank"
					rel="noopener noreferrer"
					class="text-slate-200 hover:text-[var(--vitrine-ok)]"
				>
					LinkedIn
				</a>
			</div>
			<div>{PROFILE.name} | {PROFILE.location}</div>
		</div>
	</div>
</footer>
