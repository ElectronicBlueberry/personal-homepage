<script lang="ts">
	import type { ImageObject } from "$models/gallery"
	
	import { onMount } from "svelte"
	import { apiUrl } from "$lib/api"
	
	export let imageObject: ImageObject;
	export let index: number;
	export let maxSize: number = null;
	export let quality = 60;
	export let baseWidth = 300;
	export let galleryId: number;
	export let defaultColor = "#ffffff";
	
	let element;
	
	let aspectRatio = 1.0;
	
	let respectMaxSize = true;
	let params = "";
	let sizeParam = "";
	
	$: {
		aspectRatio = imageObject.width / imageObject.height;
	}
	
	$: {
		if (maxSize) {
			if (aspectRatio > 1.0) {
				sizeParam = `&width=${ maxSize }`;
				aspectRatio = maxSize / Math.round(maxSize / aspectRatio);
			} else {
				sizeParam = `&height=${ maxSize }`;
				aspectRatio = Math.round(maxSize * aspectRatio) / maxSize;
			}
		}
	}
	
	onMount(checkSize);
	
	// for images not to appear blurry when scaled too large, fetch a high res version on large element size
	function checkSize() {
		if (element.offsetWidth > maxSize || element.offsetHeight > maxSize) {
			respectMaxSize = false;
		} else {
			respectMaxSize = true;
		}
	}
	
	$: {
		if (respectMaxSize) {
			params = `quality=${ quality }${ sizeParam }`;
		} else {
			params = `quality=${ quality }`;
		}
	}
</script>

<svelte:window on:resize={ checkSize }></svelte:window>

<div class="gallery-image" style="--aspect-ratio: { aspectRatio }; --base-width: { baseWidth }px; --color: { imageObject.color || defaultColor }" bind:this={ element }>
	<a href="/gallery/{ galleryId }?index={ index }" title={ imageObject.title }>
		<img src="{ apiUrl }/assets/{ imageObject.id }?{ params }"
		     title={ imageObject.title }
		     alt={ imageObject.description || imageObject.title }>
		
		<div class="overlay"></div>
	</a>
</div>

<style lang="scss">
	@import "../scss/mixins";

	.gallery-image {
		flex: calc(var(--aspect-ratio) * 10);
		min-width: min(100%, calc(var(--base-width) * var(--aspect-ratio)));
		overflow: hidden;
		position: relative;
		
		@include media-max-width(800px) {
			min-width: min(100%, calc(var(--base-width) * 0.8 * var(--aspect-ratio)));
		}
		
		@include media-max-width(360px) {
			min-width: 0;
			width: 100%;
		}
		
		img {
			display: block;
			width: 100%;
		}
		
		.overlay {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			
			transition: 0.2s border;
			border: 0px solid var(--color);
			
			&:hover {
				border: 4px solid var(--color);
			}
		}
	}
</style>
