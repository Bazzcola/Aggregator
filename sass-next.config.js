const path = require('path');
const withSass = require('@zeit/next-sass');

module.exports = withSass({
  webpack(config, options) {
    config.resolve.alias['ui'] = path.join(__dirname, 'src/ui');
    return config;
  }
});
