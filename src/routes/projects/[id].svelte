<script lang="ts" context="module">
	import type { Load } from "@sveltejs/kit"
	import type { ProjectObject } from "$models/projects"
	import { apiUrl } from "$lib/api"
	
	export const load: Load = async({ fetch, params }) => {
		const projectId = params.id;
		const url = `${ apiUrl }/items/projects/${ projectId }?fields[]=id,title,article.text,color,description`;
		
		const res = await fetch(url);
		const project = res.ok && (await res.json()).data;
		
		return {
			props: {
				project
			}
		};
	}
</script>

<script lang="ts">
	import Heading from "$components/heading.svelte"
	import Section from "$components/section.svelte"
	import Projects from "$svg/projects.svg"
	
	export let project: ProjectObject;
</script>

<svelte:head>
	<title>
		{ project.title } - Laila Los
	</title>
	<meta name="description" content={ project.description }>
</svelte:head>

<a href="/projects" class="projects-link">
	<Heading color="var(--color-bright)"><Projects /></Heading>
</a>

<div class="project-view" style="--project-color: { project.color || 'var(--color-pink)' }">
	<h1> { project.title } </h1>
	
	{#each project.article as section}
		<Section color={ project.color || "var(--color-pink)" } >
			{@html section.text }
		</Section>
	{/each}
</div>

<style lang="scss">
	.projects-link {
		width: 100%;
	}
	
	.project-view {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 16px 0 48px 0;
		overflow: hidden;
		
		:global(a) {
			color: var(--project-color);
		}
		
		& > h1 {
			margin: 8px 0;
			font-size: 40px;
			position: relative;
			color: var(--project-color);
			
			&:after {
				content: "";
				position: absolute;
				display: block;
				background-color: var(--project-color);
				height: 4px;
				width: calc(100% * 2);
				left: -50%;
			}
		}
		
		:global(section) {
			display: flex;
			flex-direction: column;
			padding-bottom: 12px;
			
			:global(*) {
				margin: 0.33em 0;
			}
			
			:global(img) {
				max-width: 100%;
				display: block;
				margin: auto;
			}
		}
	}
</style>
