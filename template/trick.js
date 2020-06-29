const path = require('path');

module.exports = () => ({
  version: {
    major: 4,
    minor: 0,
    patch: 20,
    test: 2,
  },
  packageManager: 'yarn',
  compress: {
    command: 'dist',
  },
  globalVariables: {

  },
  environmentVariables: {
    dev: {
      commonHost: '10.10.11.71',
    },
    test: {
      commonHost: '183.57.47.83',
    },
    prod: {
      commonHost: 'newbc01.stockonline.com',
    },
  },
  config: {
    entry: {
      devConfig: path.resolve(__dirname, './dev-server.ejs'),
      config: path.resolve(__dirname, './config-base.ejs'),
    },
    output: {
      devConfig: path.resolve(__dirname, '../mock/dev-server.js'),
      config: path.resolve(__dirname, '../../config.js'),
    },
  },
});
