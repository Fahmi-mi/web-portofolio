<script lang="ts">
	import { tick } from 'svelte';
	import TopNav from '$lib/components/TopNav.svelte';
	import HeroSpecimen from '$lib/components/HeroSpecimen.svelte';
	import ScrollyArchitecture from '$lib/components/ScrollyArchitecture.svelte';
	import ProjectsGrid from '$lib/components/ProjectsGrid.svelte';
	import ExperienceHonors from '$lib/components/ExperienceHonors.svelte';
	import SkillsContact from '$lib/components/SkillsContact.svelte';
	import type { ProjectFilter } from '$lib/data/portfolio';
	import type { GraphNodeDef } from '$lib/utils/graph3d';

	let stageSelection = $state<{ index: number; seq: number } | null>(null);
	let projectSelection = $state<{
		filter: ProjectFilter;
		projectId: string | null;
		seq: number;
	} | null>(null);
	let experienceSelection = $state<{
		runIndex?: number;
		honorIndex?: number;
		seq: number;
	} | null>(null);
	let seqCounter = 0;

	async function handleSelectGraphNode(node: GraphNodeDef) {
		seqCounter += 1;
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const behavior: ScrollBehavior = reduced ? 'auto' : 'smooth';

		if (node.section === 'about' && typeof node.stageIndex === 'number') {
			stageSelection = { index: node.stageIndex, seq: seqCounter };
			return;
		}

		if (node.section === 'projects') {
			projectSelection = {
				filter: node.projectFilter ?? 'all',
				projectId: node.projectId ?? null,
				seq: seqCounter
			};
			await tick();
			const targetEl =
				(node.projectId ? document.getElementById(`project-${node.projectId}`) : null) ??
				document.getElementById('projects');
			targetEl?.scrollIntoView({ behavior, block: 'center' });
			return;
		}

		if (node.section === 'experience') {
			experienceSelection = {
				runIndex: node.runIndex,
				honorIndex: node.honorIndex,
				seq: seqCounter
			};
			await tick();
			const targetId =
				typeof node.honorIndex === 'number'
					? 'honors-spotlight'
					: typeof node.runIndex === 'number'
						? `exp-run-${node.runIndex}`
						: 'experience';
			const targetEl = document.getElementById(targetId) ?? document.getElementById('experience');
			targetEl?.scrollIntoView({ behavior, block: 'center' });
		}
	}
</script>

<svelte:head>
	<title>Fahmi Haqqul Ihsan</title>
</svelte:head>

<TopNav />
<main>
	<HeroSpecimen onSelectNode={handleSelectGraphNode} />
	<ScrollyArchitecture externalStage={stageSelection} />
	<ProjectsGrid externalSelection={projectSelection} />
	<ExperienceHonors externalSelection={experienceSelection} />
	<SkillsContact />
</main>
