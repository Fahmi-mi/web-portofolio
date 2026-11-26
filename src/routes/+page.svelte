<script lang="ts">
	import TopNav from '$lib/components/TopNav.svelte';
	import HeroSpecimen from '$lib/components/HeroSpecimen.svelte';
	import ScrollyArchitecture from '$lib/components/ScrollyArchitecture.svelte';
	import ProjectsGrid from '$lib/components/ProjectsGrid.svelte';
	import ExperienceHonors from '$lib/components/ExperienceHonors.svelte';
	import SkillsContact from '$lib/components/SkillsContact.svelte';
	import ScrollThread from '$lib/components/ScrollThread.svelte';
</script>

<svelte:head>
	<title>Fahmi Haqqul Ihsan</title>
</svelte:head>

<TopNav />
<main class="relative isolate">
	<ScrollThread />
	<HeroSpecimen />
	<ScrollyArchitecture />
	<ProjectsGrid />
	<ExperienceHonors />
	<SkillsContact />
</main>
