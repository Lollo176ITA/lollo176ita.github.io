const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  webpack: {
    plugins: {
      add: [
        // Aggiungi bundle analyzer solo se richiesto
        process.env.ANALYZE === 'true' && new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
          reportFilename: 'bundle-report.html'
        }),
        // Compressione gzip per asset di produzione
        process.env.NODE_ENV === 'production' && new CompressionPlugin({
          algorithm: 'gzip',
          test: /\.(js|css|html|json|svg)$/,
          threshold: 1024, // Solo file > 1KB
          minRatio: 0.8,
        }),
      ].filter(Boolean)
    },
    configure: (webpackConfig) => {
      // Ottimizzazioni per production
      if (process.env.NODE_ENV === 'production') {
        // Migliore splitting dei chunks
        webpackConfig.optimization.splitChunks = {
          chunks: 'all',
          maxInitialRequests: 20,
          minSize: 20000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: 10,
              reuseExistingChunk: true,
            },
            common: {
              name: 'common',
              minChunks: 2,
              priority: 5,
              reuseExistingChunk: true,
            },
            // Separa framer-motion in un chunk dedicato (è grande ~60KB)
            framerMotion: {
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              name: 'framer-motion',
              priority: 15,
              reuseExistingChunk: true,
            },
            // Separa react-router in un chunk dedicato
            reactRouter: {
              test: /[\\/]node_modules[\\/](react-router|react-router-dom)[\\/]/,
              name: 'react-router',
              priority: 15,
              reuseExistingChunk: true,
            },
            // Separa i18n in un chunk dedicato (caricato subito ma non critico)
            i18n: {
              test: /[\\/]node_modules[\\/](i18next|react-i18next)[\\/]/,
              name: 'i18n',
              priority: 15,
              reuseExistingChunk: true,
            }
          }
        };

        // Minificazione avanzata
        webpackConfig.optimization.minimizer = [
          new TerserPlugin({
            terserOptions: {
              parse: { ecma: 2020 },
              compress: {
                ecma: 2020,
                comparisons: false,
                inline: 2,
                drop_console: true, // Rimuove console.log in produzione
                drop_debugger: true,
                pure_funcs: ['console.log', 'console.warn'],
              },
              mangle: { safari10: true },
              output: { ecma: 2020, comments: false, ascii_only: true },
            },
          }),
          new CssMinimizerPlugin(),
        ];

        // Rimuovi source maps in produzione se non specificato
        if (process.env.GENERATE_SOURCEMAP === 'false') {
          webpackConfig.devtool = false;
        }
      }

      return webpackConfig;
    }
  }
};
