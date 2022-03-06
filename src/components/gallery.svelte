<script lang="ts">
	import type { GalleryObject } from "$models/gallery"
	import GalleryImage from "./galleryImage.svelte"
	
	export let galleryObject: GalleryObject;
	export let maxSize = 500;
	export let baseWidth = maxSize * 0.6;
	
	let customClass = "";
	export {customClass as class};
</script>

<div class="gallery {customClass}">
	{#each galleryObject.images as directusFile, i}
		<GalleryImage imageObject={ directusFile.directus_files_id }
		              index={ i } maxSize={ maxSize } baseWidth={ baseWidth } galleryId={ galleryObject.id } quality={ 70 }/>
	{/each}
</div>

<style lang="scss">
	@import "../scss/mixins";

	.gallery {
		margin: 0 64px;
		max-width: 1400px;
		
		display: flex;
		flex-wrap: wrap;
		
		@include media-max-width(360px) {
			flex-direction: column;
			width: calc(100% - 24px);
		}
	}
</style>
