import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex()],

	kit: {
		adapter: adapter({
			pages: 'build', // Directory dove vengono messi i file statici
			assets: 'build', // Dove vengono messi i file di asset (CSS, JS, immagini)
			fallback: null // Nessun file fallback
		  }),
		  prerender: {
			handleMissingId: 'ignore' // Ignora i link a ID mancanti
		  },
		  paths: {
			base: '/lollo176ita.github.io', // Nome del repository
		  },
	},

	extensions: ['.svelte', '.svx']
};

export default config;
