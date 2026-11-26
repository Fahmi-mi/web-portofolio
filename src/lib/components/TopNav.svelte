<script lang="ts">
	import { PROFILE } from '$lib/data/portfolio';

	let menuOpen = $state(false);

	const navLinks = [
		{ href: '#about', label: 'About' },
		{ href: '#pipeline', label: 'Architecture' },
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

<header
	class="sticky top-0 z-40 border-b border-[var(--rule)] bg-[var(--bg-bone)]/95"
	aria-label="Primary navigation"
>
	<div class="flex h-14 w-full items-center justify-between px-6 sm:px-10 lg:px-14 xl:px-20">
		<a
			href="#top"
			class="font-mono-tech text-xs font-semibold tracking-[0.08em] text-[var(--ink)] uppercase"
		>
			{PROFILE.shortBrand}
		</a>

		<nav class="hidden items-center gap-7 md:flex" aria-label="Desktop sections">
			{#each navLinks as link}
				<a
					href={link.href}
					class="font-mono-tech text-xs tracking-[0.06em] text-[var(--ink-muted)] uppercase transition-colors hover:text-[var(--ink)]"
				>
					{link.label}
				</a>
			{/each}
			<a
				href={PROFILE.cvPath}
				download={PROFILE.cvDownloadName}
				class="font-mono-tech border border-[var(--ink)] bg-[var(--ink)] px-3.5 py-1.5 text-xs font-semibold tracking-[0.04em] text-[var(--bg-plate)] uppercase transition-colors hover:border-[var(--teal)] hover:bg-[var(--teal)]"
			>
				Download CV
			</a>
		</nav>

		<div class="flex items-center gap-2.5 md:hidden">
			<a
				href={PROFILE.cvPath}
				download={PROFILE.cvDownloadName}
				class="font-mono-tech border border-[var(--ink)] bg-[var(--ink)] px-3 py-1.5 text-[11px] font-semibold tracking-[0.04em] text-[var(--bg-plate)] uppercase"
			>
				CV.pdf
			</a>
			<button
				type="button"
				class="font-mono-tech border border-[var(--rule)] bg-[var(--bg-plate)] px-3 py-1.5 text-[11px] font-medium tracking-[0.05em] text-[var(--ink)] uppercase"
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
			class="border-t border-[var(--rule)] bg-[var(--bg-plate)] px-6 py-4 md:hidden"
			aria-label="Mobile sections"
		>
			<div class="flex flex-col gap-3">
				{#each navLinks as link}
					<a
						href={link.href}
						onclick={() => (menuOpen = false)}
						class="font-mono-tech border-b border-[var(--rule)] pb-2 text-xs tracking-[0.06em] text-[var(--ink)] uppercase"
					>
						{link.label}
					</a>
				{/each}
			</div>
		</nav>
	{/if}
</header>
