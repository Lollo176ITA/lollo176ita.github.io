import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { compression } from 'vite-plugin-compression2';
import { vitePrerenderPlugin } from 'vite-prerender-plugin';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  const prerenderRoutes = [
    '/',
    '/about',
    '/creations',
    '/creations/books',
    '/history',
    '/lighthouse',
    '/trophies',
  ];

  return {
    plugins: [
      // Abilita JSX anche nei file .js (il progetto usa .js invece di .jsx)
      react({
        include: /\.[jt]sx?$/,
      }),

      // Prerender delle pagine principali per migliorare SEO e score Lighthouse
      vitePrerenderPlugin({
        renderTarget: '#root',
        prerenderScript: fileURLToPath(new URL('./src/prerender.js', import.meta.url)),
        additionalPrerenderRoutes: prerenderRoutes,
        previewMiddlewareFallback: '/index.html',
      }),

      // Compressione gzip per asset > 1KB in produzione
      isProd && compression({
        algorithm: 'gzip',
        include: /\.(js|css|html|json|svg)$/,
        threshold: 1024,
        deleteOriginalAssets: false,
      }),
    ].filter(Boolean),

    // Dice a esbuild di trattare i file .js come JSX
    esbuild: {
      loader: 'jsx',
      include: /src\/.*\.js$/,
      exclude: [],
    },

    // Per il dev server: stessa opzione a livello di ottimizzazione dipendenze
    optimizeDeps: {
      esbuildOptions: {
        loader: {
          '.js': 'jsx',
        },
      },
    },

    // Output in build/ per compatibilita con gli script di deploy esistenti
    build: {
      outDir: 'build',
      sourcemap: false,
      minify: 'esbuild',
      target: 'es2020',

      rollupOptions: {
        output: {
          manualChunks: {
            vendors: ['react', 'react-dom'],
            'framer-motion': ['framer-motion'],
            'react-router': ['react-router-dom'],
            i18n: ['i18next', 'react-i18next'],
          },
        },
      },
    },

    base: '/',
    publicDir: 'public',

    server: {
      port: 3000,
      open: true,
    },

    test: {
      environment: 'jsdom',
      setupFiles: './src/setupTests.js',
      globals: true,
    },
  };
});
