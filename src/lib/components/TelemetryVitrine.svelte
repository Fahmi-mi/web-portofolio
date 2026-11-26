<script lang="ts">
	import { onMount } from 'svelte';
	import type { TelemetryLine } from '$lib/data/portfolio';
	import { nextTraceIndex } from '$lib/utils/interactions';

	interface Props {
		title: string;
		subtitle: string;
		lines: TelemetryLine[];
		rightLabel?: string;
		rightSublabel?: string;
	}

	let {
		title,
		subtitle,
		lines,
		rightLabel = 'Internship Ready',
		rightSublabel = 'Data Science & AI / SWE'
	}: Props = $props();

	let rootEl = $state<HTMLElement | null>(null);
	let activeIndex = $state(0);
	let isVisible = $state(false);
	let reducedMotion = $state(false);

	onMount(() => {
		const media = window.matchMedia('(prefers-reduced-motion: reduce)');
		reducedMotion = media.matches;

		const handleMotionChange = (event: MediaQueryListEvent) => {
			reducedMotion = event.matches;
		};
		media.addEventListener('change', handleMotionChange);

		const observer = new IntersectionObserver(
			(entries) => {
				isVisible = entries.some((entry) => entry.isIntersecting);
			},
			{ threshold: 0.15 }
		);

		if (rootEl) observer.observe(rootEl);

		const timer = window.setInterval(() => {
			if (!isVisible || document.hidden || reducedMotion) return;
			activeIndex = nextTraceIndex(activeIndex, lines.length, reducedMotion);
		}, 3400);

		return () => {
			media.removeEventListener('change', handleMotionChange);
			observer.disconnect();
			window.clearInterval(timer);
		};
	});
</script>

<aside
	bind:this={rootEl}
	class="bg-[var(--vitrine)] text-[var(--vitrine-ink)]"
	aria-label={title}
>
	<div
		class="mx-auto grid max-w-[1360px] grid-cols-1 gap-5 px-5 py-5 sm:px-8 lg:grid-cols-[240px_1fr_220px] lg:items-center lg:gap-8"
	>
		<div>
			<div class="font-display text-base font-bold text-white">{subtitle}</div>
			<div class="font-mono-tech mt-1 text-[11px] font-medium tracking-[0.06em] text-[var(--vitrine-ok)] uppercase">
				{title}
			</div>
		</div>

		<div class="space-y-1.5 border-[var(--vitrine-muted)]/30 font-mono-tech text-xs leading-relaxed lg:border-l lg:pl-6">
			{#each lines as line, idx}
				<div
					class="border-l pl-2.5 transition-colors duration-300"
					class:border-[var(--vitrine-ok)]={idx === activeIndex && !reducedMotion}
					class:border-transparent={idx !== activeIndex || reducedMotion}
				>
					<span class="text-[var(--vitrine-ok)]">[{line.tag}]</span>
					<span class="text-slate-200"> {line.message} </span>
					<span
						class={line.tone === 'alert'
							? 'text-[var(--vitrine-alert)]'
							: 'text-[var(--vitrine-ok)]'}
					>
						{line.outcome}
					</span>
				</div>
			{/each}
		</div>

		<div class="font-mono-tech text-xs text-[var(--vitrine-muted)] lg:text-right">
			<strong class="block text-sm font-semibold text-white">{rightLabel}</strong>
			<span>{rightSublabel}</span>
		</div>
	</div>
</aside>
