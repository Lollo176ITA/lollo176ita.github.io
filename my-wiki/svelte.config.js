import adapter from '@sveltejs/adapter-static';
import {
    vitePreprocess
} from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			fallback: '404.html'
		}),
		paths: {
			base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
		  },
		prerender: {
			handleHttpError: ({ status, path, referrer, referenceType }) => {
				if (status === 404 || path === '/path/to/image.jpg') {
				  // Ignora l'errore 404 per questa immagine specifica
				  return;
				}
				// Per altri errori, lancia un'eccezione
				throw new Error(`${status} ${path}${referrer ? ` (linked from ${referrer})` : ''}`);
			  },
			entries: [
			'/',
			'/alfabeti',
			'/alfabeti/romano',
			'/alfabeti/romano/A',
			'/alfabeti/greco',
			'/alfabeti/greco/Α',
			'/alfabeti/ebraico',
			'/alfabeti/ebraico/א',
			
			// Aggiungi qui altre rotte specifiche che desideri prerenderizzare
			]
		},
		//paths: {
        //    base: process.env.NODE_ENV === 'production' ? '/lollo176ita.github.io' : '',
        //}
    }
};

export default config;