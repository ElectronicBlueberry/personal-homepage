<script lang="ts">
	export let color: string;
	
	let customClass: string = "";
	export { customClass as class };
</script>

<section class="{customClass}" style="--highlight-color: {color}">
	<slot></slot>
</section>

<style lang="scss">
	@import "../scss/mixins";
	
	section {
		position: relative;
		background-color: var(--color-bright);
		padding: 12px 24px 8px;
		margin: 24px 0;
		
		@include media-max-width(400px) {
			padding: 8px 12px 4px;
		}
		
		width: calc(100% - 48px);
		max-width: 960px;
		
		color: var(--color-font);
		text-shadow: 0.1px 0.1px 2px rgba(1, 1, 17, 0.2);
		
		&:after {
			content: "";
			z-index: -1;
			display: block;
			position: absolute;
			
			width: calc(100% + 16px);
			height: calc(100% - 20px);
			left: -8px;
			top: 10px;
			
			transition: 0.2s background-color;
			
			background-color: var(--highlight-color);
		}
		
		:global(h1) {
			margin-top: 0.5em;
		}
		
		:global(a) {
			color: var(--color-pink);
		}
		
		:global(img) {
			box-shadow: 0.5px 0.5px 6px rgba(1, 1, 17, 0.2);
		}
		
		
		:global(.images-small) {
			display: grid;
			gap: 12px;
			grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
			
			:global(img) {
				margin: 0 !important;
			}
		}
	}
</style>
