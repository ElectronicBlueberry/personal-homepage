import { browser } from "$app/env";

let _apiUrl = "";

if (browser) {
	_apiUrl = import.meta.env.VITE_DIRECTUS_URL_PUBLIC as string;
} else {
	_apiUrl = import.meta.env.VITE_DIRECTUS_URL_LOCAL as string;
}

export const apiUrl = _apiUrl;
