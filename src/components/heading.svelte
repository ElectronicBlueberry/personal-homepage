<script lang="ts">
	//export let src: string;
	//export let alt: string;
	export let color: string = "rgba(255, 255, 255, 0.0)";
</script>

<div class="heading" style="background-color: { color };">
	<slot></slot>
</div>

<style lang="scss">
	.heading {
		height: 64px;
		width: 100%;
		max-height: 8vw;
		overflow: hidden;
		display: grid;
		place-items: center;
		
		:global(svg) {
			object-fit: cover;
			height: 105%;
		}
	}
</style>
