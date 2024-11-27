import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				primary: "#000000", // Nero
				secondary: "#FFFFFF", // Bianco
			  },
		},
	},

	plugins: [typography, forms, containerQueries]
} satisfies Config;