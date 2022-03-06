<script lang="ts">
	import { page } from "$app/stores"
	
	interface NavLink {
		title: string,
		href: string
	}
	
	export let navLinks: NavLink[] = [];
	
	function active(href: string) {
		if (href === "/") {
			return href === $page.url.pathname;
		} else {
			return $page.url.pathname.startsWith(href);
		}
	}
</script>

<header class="header">
	<a href="/">
		<img src="/img/icon.png" alt="Laila Los"/>
	</a>
	
	<nav>
		{#key $page.url.pathname}
			{#each navLinks as navLink}
				<a href={ navLink.href } class:active={ active(navLink.href) }> { navLink.title } </a>
			{/each}
		{/key}
	</nav>
</header>

<style lang="scss">
	@import "../scss/mixins";
	
	.header {
		color: var(--color-pink);
		
		width: 100%;
		min-height: 56px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		
		padding: 2px 24px;
		border-bottom: 2px solid var(--color-pink);
		
		@include media-max-width(720px) {
			flex-direction: column;
			gap: 4px;
			padding: 8px 0;
		}
		
		& > a {
			color: var(--color-pink);
			height: 46px;
		}
		
		nav {
			height: 100%;
			display: flex;
			gap: 24px;
			align-items: center;
			
			@include media-max-width(310px) {
				flex-direction: column;
				gap: 8px;
				padding: 8px 0;
			}
			
			a {
				font-size: 22px;
				color: var(--color-bright);
				text-decoration: none;
				font-weight: bold;
				
				transition: 0.2s color;
				
				&:hover {
					color: var(--color-pink-pale);
				}
				
				&.active {
					color: var(--color-pink);
				}
			}
		}
	}
</style>
