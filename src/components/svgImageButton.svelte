<script lang="ts">
	import type { ImageObject } from "$models/gallery"
	
	export let imageObject: ImageObject;
	
	let customClass = "";
	export {customClass as class};
	
	let imageUrl = "";
	$: {
		imageUrl = `${ import.meta.env.VITE_DIRECTUS_URL_PUBLIC }/assets/${ imageObject.id }?height=192&quality=75`;
	}
</script>

<div on:click class="image-button { customClass }" style="--color: { imageObject.color || 'white' }; --fill-url: url(#pattern-{imageObject.id})">
	<svg>
		<defs>
			<pattern id="pattern-{imageObject.id}" width="100%" height="100%">
				<image href={ imageUrl } />
			</pattern>
		</defs>
		<slot></slot>
	</svg>
</div>

<style lang="scss">
	.image-button {
		max-height: 148px;
		
		:global(svg) {
			display: block;
			width: 100%;
			height: 100%;
		}
		
		:global(path) {
			cursor: pointer;
			
			stroke: "white" !important;
			fill: var(--fill-url) !important;
			stroke-width: 2px !important;
			
			transition: 0.2s stroke-width, 0.2s stroke;
			
			&:hover {
				stroke-width: 5px !important;
				stroke: var(--color) !important;
			}
		}
	}
</style>
