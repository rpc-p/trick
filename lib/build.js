const fse = require('fs-extra');
const path = require('path');
const spawn = require('cross-spawn');

const config = require('../helper/config');

const { info, error  } = require('../utils/logger');

function build(version) {
  const { packageManager, argv } = config.buildConfig;
  config.upgradeVersion(version);
  
  info(`Start packing ....`);

  const dist = spawn(packageManager, argv, {});

  dist.stdout.on('data', (data) => {
    info(`trick standard output: ${data}`);
  });

  dist.stderr.on('data', (data) => {
    error(`stderr: ${data}`);
  });

  dist.on('close', (code) => {
    error(`child process exited with code ${code}`);
  });
}

module.exports = { build };
