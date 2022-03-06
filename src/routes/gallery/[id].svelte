<script lang="ts" context="module">
	import type { Load } from "@sveltejs/kit"
	import type { GalleryObject } from "$models/gallery"
	
	export const load: Load = async({ params, fetch }) => {
		const galleryId = params.id;
		const galleryUrl = `${ import.meta.env.VITE_DIRECTUS_URL }/items/galleries/${ galleryId }?fields[]=*,images.directus_files_id.*`;
		
		const galleryRes = await fetch(galleryUrl);
		const galleryObject = galleryRes.ok && (await galleryRes.json()).data;
		
		return {
			props: {
				galleryObject
			}
		};
	}
</script>

<script lang="ts">
	import type { ImageObject } from "$models/gallery"
	import { page } from "$app/stores"
	import { goto } from "$app/navigation"
	import { browser } from "$app/env"
	
	import ImageView from "$components/imageView.svelte"
	import SvgImageButton from "$components/svgImageButton.svelte"
	
	import ArrowLeft from "$svg/arrow_left.svg"
	import ArrowRight from "$svg/arrow_right.svg"
	import Section from "$components/section.svelte"
	
	import Heading from "$components/heading.svelte"
	import Gallery from "$svg/gallery.svg"
	
	export let galleryObject: GalleryObject;
	
	function mod(a: number, b: number) {
		return ((a % b) + b) % b;
	}
	
	let index: number = parseInt( $page.url.searchParams.get("index") || "0");
	
	if (index >= galleryObject.images.length || index < 0) {
		updateIndexParam()
	}
	
	let imageObject: ImageObject;
	$: imageObject = galleryObject.images[index].directus_files_id;
	
	function updateIndexParam() {
		index = mod(index, galleryObject.images.length);
		$page.url.searchParams.set("index", `${ index }`);
		if (browser) {
			goto($page.url.href, { replaceState: false, noscroll: true });
		}
	}
	
	function imageAtIndex(i: number) {
		i = mod(i, galleryObject.images.length);
		return galleryObject.images[i].directus_files_id;
	}
	
	function next() {
		index += 1;
		updateIndexParam();
	}
	
	function prev() {
		index -= 1;
		updateIndexParam();
	}
</script>

<svelte:head>
	<title>
		{ galleryObject.title } - Laila Los
	</title>
	<meta name="description" content={ galleryObject.description }>
</svelte:head>

<a href="/gallery" class="gallery-link"> <Heading color="var(--color-bright)"> <Gallery /> </Heading> </a>

<div class="img-viewer" style="--gallery-color: { galleryObject.color || "white" }">
	<h1>{ galleryObject.title }</h1>
	<span>{ galleryObject.subtitle }</span>
	
	<div class="img-container">
		<ImageView class="view" imageObject={ imageObject } />
		<SvgImageButton class="left" imageObject={ imageAtIndex(index - 1) } on:click={ prev }><ArrowLeft /></SvgImageButton>
		<SvgImageButton class="right" imageObject={ imageAtIndex(index + 1) } on:click={ next }><ArrowRight /></SvgImageButton>
	</div>
	
	<Section class="text" color={ imageObject.color || "var(--color-pink)" }>
		<h1>{ imageObject.title }</h1>
		{#if imageObject.description}
			<p>{ imageObject.description }</p>
		{/if}
	</Section>
</div>

<style lang="scss">
	@import "../../scss/mixins";
	
	.gallery-link {
		width: 100%;
	}
	
	.img-viewer {
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: center;
		text-align: center;
		overflow: hidden;
		padding-bottom: 48px;
		
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
		}
		
		.img-container {
			display: grid;
			grid-template-columns: 120px 1fr 120px;
			grid-template-areas: "l v r";
			align-items: center;
			
			height: 50vw;
			width: 100%;
			max-height: 960px;
			max-width: 1400px;
			
			@include media-max-width(600px) {
				grid-template-areas: "v v v"
				                     "l x r";
				grid-template-rows: 80vw 1fr;
				grid-template-columns: 1fr 0 1fr;
				max-height: none;
				height: unset;
				
				gap: 24px;
				
				:global(.left), :global(.right) {
					max-height: 40vw;
					height: 100%;
				}
			}
			
			margin: 24px 0;
			
			:global(.view) {
				grid-area: v;
				align-self: stretch;
				justify-self: center;
			}
			
			:global(.left) {
				grid-area: l;
			}
			
			:global(.right) {
				grid-area: r;
			}
		}
		
		:global(.text) {
			display: flex;
			flex-direction: column;
			align-items: center;
			
			:global(p) {
				text-align: start;
			}
		}
	}
</style>
