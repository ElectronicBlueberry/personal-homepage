import adapter from "@sveltejs/adapter-node"
import preprocess from "svelte-preprocess"
import { resolve } from "path"
import svg from "@poppanator/sveltekit-svg"
import autoprefixer from "autoprefixer"

/** @type {import('svgo').OptimizeOptions} */
const svgoOptions = {
	plugins: [
		"preset-default",
		{
			name: "preset-default",
			params: {
				overrides: {
					removeHiddenElems: {
						opacity0: false
					}
				}
			}
		}
	]
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		postcss: {
			plugins: [autoprefixer]
		}
	}),

	kit: {
		adapter: adapter({
			out: "build"
		}),
		
		vite: {
			resolve: {
				alias: {
					$components: resolve("./src/components"),
					$svg: resolve("./src/svg"),
					$models: resolve("./src/models")
				}
			},
			plugins: [
				svg({
					includePaths: [resolve("./src/svg/")],
					svgoOptions: svgoOptions
				})
			]
		}
	}
};

export default config;
