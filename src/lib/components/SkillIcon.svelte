<script lang="ts">
	let { iconSrc }: { iconSrc: string } = $props();
</script>

<img
	src={iconSrc}
	alt=""
	aria-hidden="true"
	width="18"
	height="18"
	loading="eager"
	decoding="async"
	class="h-[18px] w-[18px] shrink-0 object-contain"
/>
