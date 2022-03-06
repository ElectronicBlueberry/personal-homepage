/// <reference types="@sveltejs/kit" />


// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	interface Stuff {
		socialIcons: any
	}
}

declare module "*.svg" {
	const content: any
	export default content
}

declare module "*.svg?component" {
	const content: any
	export default content
}

declare module "*.svg?src" {
	const content: any
	export default content
}

declare module "*.svg?url" {
	const content: any
	export default content
}
