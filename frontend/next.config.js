const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  env: {
    API_BASE_URL: 'http://localhost:3333/api',
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    };

    return config;
  },
});
