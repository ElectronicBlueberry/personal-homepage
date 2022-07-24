<script lang="ts">
	import { page } from "$app/stores"
	
	import type { SocialLinkObject } from "$models/socials"
	
	export let social: SocialLinkObject;
	export let size = 36;
</script>

<a href={ social.url } title={ social.title } target="blank" style="--size: {size}px;">
	{@html $page.stuff.socialIcons[social.icon] }
</a>

<style lang="scss">
	a {
		text-align: center;
		color: var(--color-pink);
		text-decoration: none;
		height: var(--size);
		width: var(--size);
		
		:global(svg) {
			height: var(--size);
			fill: var(--color-pink);
			transition: 0.25s fill;
		}
		
		&:hover {
			:global(svg) {
				fill: var(--color-pink-pale);
			}
		}
	}
</style>
