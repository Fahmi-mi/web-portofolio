<script lang="ts">
	import { onMount } from 'svelte';

	let progress = $state(0.12);

	onMount(() => {
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduced) {
			progress = 1;
			return;
		}

		let rafPending = false;
		const update = () => {
			rafPending = false;
			const doc = document.documentElement;
			const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
			const ratio = Math.min(
				1,
				Math.max(0.08, (window.scrollY + window.innerHeight * 0.25) / (maxScroll + window.innerHeight * 0.25))
			);
			progress = ratio;
		};

		const onScroll = () => {
			if (!rafPending) {
				rafPending = true;
				window.requestAnimationFrame(update);
			}
		};

		update();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		};
	});
</script>

<!-- Subtle outer-gutter scroll thread connecting sections cleanly without crossing card text -->
<div
	aria-hidden="true"
	class="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden xl:block"
>
	<svg viewBox="0 0 1440 4000" preserveAspectRatio="none" class="h-full w-full">
		<path
			d="M 1408 160 L 1408 880 C 1408 940, 32 940, 32 1000 L 32 2120 C 32 2180, 1408 2180, 1408 2240 L 1408 3860"
			fill="none"
			stroke="#E4E4DF"
			stroke-width="1.5"
		/>
		<path
			d="M 1408 160 L 1408 880 C 1408 940, 32 940, 32 1000 L 32 2120 C 32 2180, 1408 2180, 1408 2240 L 1408 3860"
			fill="none"
			stroke="#0F766E"
			stroke-opacity="0.34"
			stroke-width="2"
			pathLength="1"
			stroke-dasharray="1"
			stroke-dashoffset={1 - progress}
		/>
	</svg>
</div>
