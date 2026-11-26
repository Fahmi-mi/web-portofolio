<script lang="ts">
	import TopNav from '$lib/components/TopNav.svelte';
	import HeroSpecimen from '$lib/components/HeroSpecimen.svelte';
	import SystemsBridge from '$lib/components/SystemsBridge.svelte';
</script>

<svelte:head>
	<title>Fahmi Haqqul Ihsan — Data Science, AI &amp; Software Engineering</title>
</svelte:head>

<TopNav />
<main>
	<HeroSpecimen />
	<SystemsBridge />
	<section id="projects" aria-label="Selected Projects"></section>
	<section id="experience" aria-label="Experience and Honors"></section>
	<section id="contact" aria-label="Technical Stack and Contact"></section>
</main>
