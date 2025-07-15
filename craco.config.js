const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  webpack: {
    plugins: {
      add: [
        // Aggiungi bundle analyzer solo se richiesto
        process.env.ANALYZE === 'true' && new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
          reportFilename: 'bundle-report.html'
        })
      ].filter(Boolean)
    },
    configure: (webpackConfig) => {
      // Ottimizzazioni per production
      if (process.env.NODE_ENV === 'production') {
        // Migliore splitting dei chunks
        webpackConfig.optimization.splitChunks = {
          chunks: 'all',
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
            // Separa framer-motion in un chunk dedicato
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
            }
          }
        };

        // Rimuovi source maps in produzione se non specificato
        if (process.env.GENERATE_SOURCEMAP === 'false') {
          webpackConfig.devtool = false;
        }
      }

      return webpackConfig;
    }
  }
};
