<script lang="ts" context="module">
	import type { Load } from "@sveltejs/kit"
	import { apiUrl } from "$lib/api"
	
	async function getSocialIcon(id: string, fetchFunction: typeof fetch) {
		const url = `${ apiUrl }/assets/${id}`;
		const res = await fetchFunction(url);
		
		return {key: id, val: res.ok && (await res.text())};
	}
	
	export const load: Load = async({ fetch }) => {
		// global data urls
		const footerUrl = `${ apiUrl }/items/footer?fields[]=*,social_links.social_links_id.*`;
		const socialIconsUrl = `${ apiUrl }/items/social_links?fields[]=icon`;
		
		// resolve fetch in parallel
		const [ footerRes, socialIconsRes ] = await Promise.all([
			fetch(footerUrl),
			fetch(socialIconsUrl)
		]);
		
		// convert to json in parallel
		const [ footerContent, socialIconsContent ] = await Promise.all([
			footerRes.ok && footerRes.json(),
			socialIconsRes.ok && socialIconsRes.json()
		]);
		
		// fetch icon data in parallel
		const socialIconArray = socialIconsContent.data.map(o => getSocialIcon(o.icon, fetch));
		await Promise.allSettled(socialIconArray);
		
		// convert icon data array to object
		let socialIcons: SocialIcons = {};
		for await (const icon of socialIconArray) {
			socialIcons[icon.key] = icon.val;
		}
		
		return {
			props: {
				footerContent: footerContent.data
			},
			stuff: {
				socialIcons
			}
		};
	}
</script>

<script lang="ts">
	import type { SocialIcons, SocialLinkObject } from "$models/socials"
	
	import Header from "$components/header.svelte"
	import Footer from "$components/footer.svelte"
	
	export let footerContent: {
		footer_text: string,
		social_links: Array<{
			social_links_id: SocialLinkObject
		}>
	}
	
	const navLinks = [
		{
			title: "about me",
			href: "/"
		},
		{
			title: "gallery",
			href: "/gallery"
		},
		{
			title: "projects",
			href: "/projects"
		}
	]
</script>

<div class="app">
	<Header navLinks={ navLinks } />
	<slot></slot>
	<Footer text={ footerContent.footer_text } socials={ footerContent.social_links.map((l) => l.social_links_id) }/>
</div>

<style lang="scss">
	@import "../scss/colors";
	
	:global * {
		box-sizing: border-box;
	}
	
	:global(body) {
		font-size: 18px;
		font-family: "Atkinson Hyperlegible", sans-serif;
		color: var(--color-bright);
		
		margin: 0;
		min-height: 100vh;
		
		background-color: var(--color-background);
		display: flex;
		flex-direction: column;
	}
	
	.app {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100vh;
	}
</style>
