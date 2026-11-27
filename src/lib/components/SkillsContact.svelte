<script lang="ts">
	import { MARQUEE_ROWS, PROFILE } from '$lib/data/portfolio';
	import { copyEmailSafely } from '$lib/utils/interactions';
	import SkillIcon from '$lib/components/SkillIcon.svelte';

	let copyState = $state<'idle' | 'copied' | 'fallback'>('idle');

	async function handleCopyEmail() {
		const clipboard = typeof navigator !== 'undefined' ? navigator.clipboard : undefined;
		copyState = await copyEmailSafely(PROFILE.email, clipboard);
	}
</script>

<section id="skills" class="border-b border-[var(--rule)] bg-[var(--bg-bone)]">
	<div class="w-full px-6 py-20 sm:px-10 lg:px-14 lg:py-24 xl:px-20">
		<div class="border-b border-[var(--rule)] pb-6">
			<h2 class="font-display text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-4xl">
				Technical Stack
			</h2>
			<p class="mt-2 max-w-[68ch] text-base text-[var(--ink-muted)]">
				Languages, statistical ML frameworks, causal toolchains, and production data infrastructure.
			</p>
		</div>

		<div class="mt-10 space-y-4">
			<!-- Row 1: drifts left; pauses on hover -->
			<div class="marquee-row overflow-hidden py-1">
				<div class="marquee-mask overflow-hidden">
					<div class="marquee-track-left flex w-max items-center gap-3.5 pr-3.5">
						{#each MARQUEE_ROWS.top as skill}
							<div
								class="group flex shrink-0 items-center gap-2.5 rounded-full border border-[var(--rule)] bg-[var(--bg-plate)] px-4 py-2 transition-colors duration-200 hover:border-[var(--ink)]"
							>
								<SkillIcon iconSrc={skill.iconSrc} />
								<span class="font-mono-tech text-xs font-medium text-[var(--ink)] whitespace-nowrap">
									{skill.name}
								</span>
							</div>
						{/each}
						{#each MARQUEE_ROWS.top as skill}
							<div
								aria-hidden="true"
								class="marquee-duplicate group flex shrink-0 items-center gap-2.5 rounded-full border border-[var(--rule)] bg-[var(--bg-plate)] px-4 py-2 transition-colors duration-200 hover:border-[var(--ink)]"
							>
								<SkillIcon iconSrc={skill.iconSrc} />
								<span class="font-mono-tech text-xs font-medium text-[var(--ink)] whitespace-nowrap">
									{skill.name}
								</span>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<!-- Row 2: drifts right cleanly opposite Row 1 -->
			<div class="marquee-row overflow-hidden py-1">
				<div class="marquee-mask overflow-hidden">
					<div class="marquee-track-right flex w-max items-center gap-3.5 pr-3.5">
						{#each MARQUEE_ROWS.bottom as skill}
							<div
								class="group flex shrink-0 items-center gap-2.5 rounded-full border border-[var(--rule)] bg-[var(--bg-plate)] px-4 py-2 transition-colors duration-200 hover:border-[var(--ink)]"
							>
								<SkillIcon iconSrc={skill.iconSrc} />
								<span class="font-mono-tech text-xs font-medium text-[var(--ink)] whitespace-nowrap">
									{skill.name}
								</span>
							</div>
						{/each}
						{#each MARQUEE_ROWS.bottom as skill}
							<div
								aria-hidden="true"
								class="marquee-duplicate group flex shrink-0 items-center gap-2.5 rounded-full border border-[var(--rule)] bg-[var(--bg-plate)] px-4 py-2 transition-colors duration-200 hover:border-[var(--ink)]"
							>
								<SkillIcon iconSrc={skill.iconSrc} />
								<span class="font-mono-tech text-xs font-medium text-[var(--ink)] whitespace-nowrap">
									{skill.name}
								</span>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<footer id="contact" class="bg-[var(--vitrine)] text-[var(--vitrine-ink)]">
	<div class="w-full px-6 py-16 sm:px-10 lg:px-14 lg:py-20 xl:px-20">
		<div class="grid grid-cols-1 gap-8 border-b border-slate-700/80 pb-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
			<div>
				<h2 class="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
					Let's Build Something Reliable
				</h2>
				<p class="mt-3 max-w-[64ch] text-base leading-relaxed text-slate-300">
					Open to collaborating on AI systems, data pipelines, and backend engineering. Reach out directly by email or explore my code and resume below.
				</p>
			</div>

			<div class="flex flex-wrap items-center gap-3 lg:justify-end">
				<button
					type="button"
					onclick={handleCopyEmail}
					class="font-mono-tech rounded-full border border-[var(--vitrine-ok)] bg-[var(--vitrine-ok)] px-5 py-2.5 text-xs font-semibold text-[#0E1716] transition-colors hover:bg-[#99dfd0]"
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
					class="font-mono-tech rounded-full border border-slate-500 px-5 py-2.5 text-xs font-medium text-slate-100 transition-colors hover:border-white hover:text-white"
				>
					Send Email
				</a>
				<a
					href={PROFILE.cvPath}
					download={PROFILE.cvDownloadName}
					class="font-mono-tech rounded-full border border-slate-100 bg-slate-100 px-5 py-2.5 text-xs font-semibold text-[var(--vitrine)] transition-colors hover:bg-white"
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
