<script lang="ts">
	import type { SocialLinkObject } from "$models/socials"
	import SocialLink from "./socialLink.svelte";
	
	export let text: string;
	export let socials: SocialLinkObject[];
</script>

<div class="footer">
	<div class="footer-content">
		<span>{ text }</span>
	
		<div class="links">
			{#each socials as social}
				<SocialLink social={ social } />
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	@import "../scss/mixins";
	
	.footer {
		width: 100%;
		border-top: 2px solid var(--color-pink);
		color: var(--color-pink);
		min-height: 56px;
		margin-top: auto;
		display: flex;
		align-items: center;
		justify-content: center;
		
		.footer-content{
			display: flex;
			align-items: center;
			justify-content: space-between;
			
			padding: 0 12px;
			width: 100%;
			max-width: 1400px;
			
			@include media-max-width(720px) {
				padding: 12px 0;
				gap: 12px;
				
				flex-direction: column-reverse;
				justify-content: center;
			}
			
			span {
				opacity: 50%;
			}
			
			.links {
				display: flex;
				align-items: baseline;
				gap: 18px;
			}
		}
	}
</style>
