<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit"
	import type { GalleryObject } from "$models/gallery"
	import type { SocialLinkObject } from "$models/socials"
	import type { ProjectObject } from "$models/projects"
	import { apiUrl } from "$lib/api"
	
	export const load: Load = async ({ fetch }) => {
		const galleryFields = "featured_gallery.*,featured_gallery.images.directus_files_id.*";
		const socialLinksFields = "social_links.social_links_id.*";
		
		const p = "featured_projects.projects_id";
		const projectFields = `${p}.id,${p}.title,${p}.abstract,${p}.featured_image`;
		
		const params = `?fields[]=*,${ galleryFields },${ socialLinksFields },${ projectFields }`;
		const url = `${apiUrl}/items/homepage_content${ params }`;
		const res = await fetch(url);
		
		const content = res.ok && (await res.json()).data;
		
		return {
			props: {
				content
			}
		};
	}
</script>

<script lang="ts">
	import Heading from "$components/heading.svelte"
	import Section from "$components/section.svelte"
	import Gallery from "$components/gallery.svelte"
	import IconLink from "$components/iconLink.svelte"
	import ProjectPreview from "$components/projectPreview.svelte"
	
	import AboutMe from "$svg/about_me.svg"
	import MyProjects from "$svg/my_projects.svg"
	import MyPictures from "$svg/my_pictures.svg"
	
	interface Content {
		about_me_content: string,
		description: string,
		social_links: Array<{
			social_links_id: SocialLinkObject
		}>,
		featured_projects: Array<{
			projects_id: ProjectObject
		}>,
		featured_gallery: GalleryObject
	}
	
	export let content: Content;
	
	content.featured_projects.forEach(p => {
		let project = p.projects_id;
		project.color = "var(--color-pink)";
	});
</script>

<svelte:head>
	<title>
		About Me - Laila Los
	</title>
	<meta name="description" content={ content.description }>
</svelte:head>

<div class="index">
	<Heading color="var(--color-bright)"> <AboutMe /> </Heading>
	
	<div class="part about">
		<Section color="var(--color-pink)" class="about-me">
			{@html content?.about_me_content}
			<div class="social-links">
				{#each content.social_links.map(l => l.social_links_id) as social}
					<IconLink social={ social } size={ 38 }/>
				{/each}
			</div>
		</Section>
	</div>
	
	<Heading color="var(--color-blue)"> <MyProjects /> </Heading>
	
	<div class="part projects">
		{#each content.featured_projects.map(p => p.projects_id) as project}
			<ProjectPreview project={ project } />
		{/each}
		<b class="see-more">More in <a href="/projects">Projects</a></b>
	</div>
	
	<Heading color="var(--color-teal)"> <MyPictures /> </Heading>
	
	<div class="part pictures">
		<Gallery galleryObject={ content.featured_gallery } />
		
		<b class="see-more">More in <a href="/gallery">Gallery</a></b>
	</div>
</div>
	
<style lang="scss">
	@import "../scss/mixins";
	
	@mixin background($img) {
		position: relative;
		
		&:before, &:after {
			content: "";
			position: absolute;
			display: block;
			left: 0;
			top: 0;
			bottom: 0;
			right: 0;
			z-index: -2;
			opacity: 50%;
		}
		
		&:before {
			background-image: $img;
			background-repeat: repeat-y;
			background-position: calc(-300px + 8%) 0;
		}
		
		&:after {
			background-image: $img;
			background-repeat: repeat-y;
			background-position: calc(300px + 92%) 100%;
		}
		
		@include media-max-width(510px) {
			&:before {
				background-position: -400% 0;
				background-size: 90%;
			}
			
			&:after {
				background-position: 500% 0;
				background-size: 90%;
			}
		}
	};
	
	.index {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		
		overflow: hidden;
		
		:global(.about-me) {
			text-align: center;
			max-width: 600px !important;
		}
		
		.part {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 24px;
			width: 100%;
			padding: 48px 0;
		}
		
		.about {
			padding: 96px 0 128px 0;
			position: relative;
			
			@include background(url("/img/bg/scribbles_about.png"));
		}
		
		.projects {
			padding: 64px 0;
			
			@include background(url("/img/bg/scribbles_projects.png"));
		}
		
		.pictures {
			@include background(url("/img/bg/scribbles_pictures.png"));
		}
		
		.social-links {
			display: flex;
			gap: 12px;
			align-items: center;
			justify-content: center;
			margin-bottom: 12px;
		}
		
		.see-more {
			font-size: 24px;
			position: relative;
			
			&:before, &:after {
				content: "";
				position: absolute;
				display: block;
				width: 128px;
				height: 2px;
				background-color: var(--color-bright);
				top: calc(50% - 1px);
			}
			
			&:before {
				left: -152px;
			}
			
			&:after {
				right: -152px;
			}
		}
		
		a {
			color: var(--color-pink);
		}
		
		:global(.gallery) {
			@include media-min-width(360px) {
				width: min(calc(36% + 660px), calc(100% - 48px));
			}
		}
	}
</style>
