<script lang="ts">
	import type { ImageObject } from "$models/gallery"
	
	export let imageObject: ImageObject;
	
	let customClass = "";
	export {customClass as class};
</script>

<div class="image-view { customClass }" style="--color: { imageObject.color || 'white' };">
	<img src="{ import.meta.env.VITE_DIRECTUS_URL_PUBLIC }/assets/{ imageObject.id }"
	     title={ imageObject.title }
	     alt={ imageObject.title }>
</div>

<style lang="scss">
	.image-view {
		display: grid;
		place-items: center;
		min-height: 0;
		
		img {
			min-height: 0;
			
			display: block;
			max-width: 100%;
			max-height: 100%;
		}
	}
</style>
