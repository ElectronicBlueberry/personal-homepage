<script lang="ts" context="module">
	import type { Load } from "@sveltejs/kit"
	import type { GalleryObject } from "$models/gallery"
	
	export const load: Load = async({ fetch }) => {
		const url = `${ import.meta.env.VITE_DIRECTUS_URL }/items/gallery_page?fields[]=*,galleries.galleries_id.*.directus_files_id.*`;
		
		const res = await fetch(url);
		const content = res.ok && (await res.json()).data;
		
		return {
			props: {
				galleries: content?.galleries,
				description: content?.description
			}
		};
	}
</script>

<script lang="ts">
	import Gallery from "$components/gallery.svelte"
	
	import Heading from "$components/heading.svelte"
	import GallerySvg from "$svg/gallery.svg"
	
	export let galleries: {galleries_id: GalleryObject}[];
	export let description: string;
</script>

<svelte:head>
	<title>
		Gallery - Laila Los
	</title>
	<meta name="description" content={ description }>
</svelte:head>

<Heading color="var(--color-bright)"> <GallerySvg /> </Heading>

<div class="gallery-page">
	{#each galleries as galleryIdObj}
		
		<h1 style="--gallery-color: { galleryIdObj.galleries_id.color || 'white' }">{ galleryIdObj.galleries_id.title }</h1>
		<span>{ galleryIdObj.galleries_id.subtitle }</span>
		<Gallery galleryObject={ galleryIdObj.galleries_id } baseWidth={ 220 }></Gallery>
	{/each}
</div>

<style lang="scss">
	.gallery-page {
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: center;
		text-align: center;
		overflow: hidden;
		
		& > h1 {
			margin-bottom: 0.3em;
			position: relative;
			color: var(--gallery-color);
			
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
		
		& > span {
			opacity: 60%;
			margin-bottom: 24px;
		}
		
		:global(.gallery) {
			margin-bottom: 48px;
		}
	}
</style>
