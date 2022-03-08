<script lang="ts">
	import type { ProjectObject } from "$models/projects"
	
	import { apiUrl } from "$lib/api"
	import Section from "$components/section.svelte"
	
	export let project: ProjectObject;
</script>

<div class="project-preview" style="{ project.color || 'var(--color-text)' }">
	<Section color={ project.color || "var(--color-pink)" }>
		<img class="featured-image" src="{ apiUrl }/assets/{ project.featured_image }" alt={ project.title } />
		<h1 class="title">{ project.title }</h1>
		<div class="abstract">
			{@html project.abstract}
		</div>
		<a class="more-link" href="/projects/{ project.id }">read more...</a>
	</Section>
</div>


<style lang="scss">
	@import "../scss/mixins";
	
	.project-preview {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;
		
		:global(section) {
			display: grid;
			grid-template-columns: 256px 1fr;
			grid-template-rows: auto 1fr auto;
			
			grid-template-areas: "i t"
			                     "i a"
			                     "i l";
			
			gap: 16px 24px;
			
			padding: 24px !important;
			
			@include media-max-width(400px) {
				padding: 24px 12px !important;
			}
			
			@include media-max-width(740px) {
				grid-template-columns: 1fr;
				grid-template-rows: auto 196px auto;
				
				grid-template-areas: "t"
				                     "i"
				                     "a"
				                     "l";
			}
		}
		
		:global(a) {
			color: var(--color-pink);
		}
		
		.featured-image {
			grid-area: i;
			display: block;
			max-width: 100%;
			max-height: 100%;
			justify-self: center;
		}
		
		.title {
			grid-area: t;
			margin: 0;
			position: relative;
			
			@include media-max-width(740px) {
				justify-self: center;
			}
			
			&:after {
				content: "";
				position: absolute;
				display: block;
				background-color: var(--gallery-color);
				height: 4px;
				width: calc(100% * 2);
				left: -50%;
			}
		}
		
		.abstract {
			grid-area: a;
			margin: 0;
			
			& > :global(p) {
				margin: 0;
			}
		}
		
		.more-link {
			grid-area: l;
			justify-self: end;
			align-self: center;
			font-size: 20px;
			font-weight: bold;
		}
	}
</style>
