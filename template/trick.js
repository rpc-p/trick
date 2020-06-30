const path = require('path');

module.exports = () => ({
  build: {
    packageManager: 'yarn',
    argv: ['dist'],
    version: '0.0.0.1',
    seperator: '.',
    packageJson: {
      version: (versionArray) => `${versionArray[0]}.${versionArray[1]}.${versionArray[2]}`,
      testversion: (versionArray) => versionArray[3],
    },
  },
  env: {
    globalVariables: {},
    environmentVariables: {
      dev: {
        commonHost: 'www.dev.com',
      },
      test: {
        commonHost: 'www.test.com',
      },
      prod: {
        commonHost: 'www.prod.com',
      },
    },
    config: {
      entry: {
        config: path.resolve(__dirname, './config.ejs'),
      },
      output: {
        config: path.resolve(__dirname, '../../config.js'),
      },
    },
  }
});