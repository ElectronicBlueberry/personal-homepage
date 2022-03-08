<script lang="ts">
	import type { ImageObject } from "$models/gallery"
	
	import { apiUrl } from "$lib/api"
	
	export let imageObject: ImageObject;
	
	let customClass = "";
	export {customClass as class};
</script>

<div class="image-view { customClass }" style="--color: { imageObject.color || 'white' };">
	<img src="{ apiUrl }/assets/{ imageObject.id }"
	     title={ imageObject.title }
	     alt={ imageObject.description || imageObject.title }>
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
