<script lang="ts" context="module">
	import type { Load } from "@sveltejs/kit"
	import type { ProjectObject } from "$models/projects"
	import { apiUrl } from "$lib/api"
	
	export const load: Load = async({ fetch }) => {
		const p = "projects.projects_id";
		const projectFields = `${p}.id,${p}.title,${p}.abstract,${p}.featured_image`;
		
		const url = `${ apiUrl }/items/projects_page?fields[]=*,${ projectFields }`;
		
		const res = await fetch(url);
		const content = res.ok && (await res.json()).data;
		
		return {
			props: {
				text: content?.text,
				projects: content?.projects.map(p => p.projects_id),
				description: content?.description
			}
		};
	}
</script>

<script lang="ts">
	import Heading from "$components/heading.svelte"
	import ProjectPreview from "$components/projectPreview.svelte"
	import Projects from "$svg/projects.svg"
	
	export let text: string;
	export let projects: ProjectObject[];
	export let description: string;
</script>

<svelte:head>
	<title>
		Projects - Laila Los
	</title>
	<meta name="description" content={ description }>
</svelte:head>

<Heading color="var(--color-bright)"><Projects /></Heading>

<div class="projects">
	<div class="text">
		{@html text}
	</div>
	{#each projects as project}
		<ProjectPreview project={ project } />
	{/each}
</div>

<style lang="scss">
	@import "../scss/mixins";
	
	.projects {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 24px 0;
		align-items: center;
		
		.text {
			text-align: center;
			max-width: 960px;
			margin: 0 48px;
			
			@include media-max-width(380px) {
				margin: 0 24px;
			}
		}
	}
</style>
