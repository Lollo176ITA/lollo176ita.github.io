import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Rimuove il prefisso aggiunto nel percorso del build
  build: {
    rollupOptions: {
      input: 'index.html'  // Specifica il file originale di sviluppo
    },
    },
});
