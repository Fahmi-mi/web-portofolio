<script lang="ts">
	import { PROFILE } from '$lib/data/portfolio';

	let menuOpen = $state(false);

	const navLinks = [
		{ href: '#about', label: 'About' },
		{ href: '#projects', label: 'Projects' },
		{ href: '#experience', label: 'Experience' },
		{ href: '#contact', label: 'Contact' }
	];
</script>

<svelte:window
	onkeydown={(event) => {
		if (event.key === 'Escape' && menuOpen) menuOpen = false;
	}}
/>

<header class="sticky top-3 z-40 px-4 sm:px-6 lg:px-10 xl:px-14" aria-label="Primary navigation">
	<div
		class="liquid-glass-light mx-auto flex h-14 w-full items-center justify-between rounded-full px-5 sm:px-6"
	>
		<a
			href="#top"
			class="font-display text-sm font-bold tracking-tight text-[var(--ink)]"
		>
			{PROFILE.name}
		</a>

		<nav class="hidden items-center gap-7 md:flex" aria-label="Desktop sections">
			{#each navLinks as link}
				<a
					href={link.href}
					class="text-sm font-medium text-[var(--ink-muted)] transition-colors hover:text-[var(--ink)]"
				>
					{link.label}
				</a>
			{/each}
			<a
				href={PROFILE.cvPath}
				download={PROFILE.cvDownloadName}
				class="font-mono-tech rounded-full bg-[var(--ink)] px-4 py-1.5 text-xs font-medium text-[var(--bg-plate)] transition-colors hover:bg-[var(--teal)]"
			>
				Download CV
			</a>
		</nav>

		<div class="flex items-center gap-2 md:hidden">
			<a
				href={PROFILE.cvPath}
				download={PROFILE.cvDownloadName}
				class="font-mono-tech rounded-full bg-[var(--ink)] px-3.5 py-1.5 text-[11px] font-medium text-[var(--bg-plate)]"
			>
				CV.pdf
			</a>
			<button
				type="button"
				class="font-mono-tech rounded-full border border-[var(--rule)] bg-white/75 px-3.5 py-1.5 text-[11px] font-medium text-[var(--ink)]"
				aria-expanded={menuOpen}
				aria-controls="mobile-nav-drawer"
				onclick={() => (menuOpen = !menuOpen)}
			>
				{menuOpen ? 'Close' : 'Menu'}
			</button>
		</div>
	</div>

	{#if menuOpen}
		<nav
			id="mobile-nav-drawer"
			class="liquid-glass-light mx-auto mt-2 rounded-2xl px-5 py-4 md:hidden"
			aria-label="Mobile sections"
		>
			<div class="flex flex-col gap-3">
				{#each navLinks as link}
					<a
						href={link.href}
						onclick={() => (menuOpen = false)}
						class="border-b border-[var(--rule)]/70 pb-2 text-sm font-medium text-[var(--ink)] last:border-b-0 last:pb-0"
					>
						{link.label}
					</a>
				{/each}
			</div>
		</nav>
	{/if}
</header>
