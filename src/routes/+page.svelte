<script lang="ts">
	import TopNav from '$lib/components/TopNav.svelte';
	import HeroSpecimen from '$lib/components/HeroSpecimen.svelte';
	import SystemsBridge from '$lib/components/SystemsBridge.svelte';
	import ProjectsGrid from '$lib/components/ProjectsGrid.svelte';
</script>

<svelte:head>
	<title>Fahmi Haqqul Ihsan — Data Science, AI &amp; Software Engineering</title>
</svelte:head>

<TopNav />
<main>
	<HeroSpecimen />
	<SystemsBridge />
	<ProjectsGrid />
	<section id="experience" aria-label="Experience and Honors"></section>
	<section id="contact" aria-label="Technical Stack and Contact"></section>
</main>
