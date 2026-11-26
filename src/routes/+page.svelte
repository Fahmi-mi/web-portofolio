<script lang="ts">
	import TopNav from '$lib/components/TopNav.svelte';
	import HeroSpecimen from '$lib/components/HeroSpecimen.svelte';
	import SystemsBridge from '$lib/components/SystemsBridge.svelte';
	import ProjectsGrid from '$lib/components/ProjectsGrid.svelte';
	import ExperienceHonors from '$lib/components/ExperienceHonors.svelte';
	import SkillsContact from '$lib/components/SkillsContact.svelte';
</script>

<svelte:head>
	<title>Fahmi Haqqul Ihsan — Data Science, AI &amp; Software Engineering</title>
</svelte:head>

<TopNav />
<main>
	<HeroSpecimen />
	<SystemsBridge />
	<ProjectsGrid />
	<ExperienceHonors />
	<SkillsContact />
</main>
