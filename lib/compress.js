const path = require('path');
const chalk = require('chalk');
const { spawn } = require('child_process');
const fse = require('fs-extra');

const log = require('../utils/log');

const cfgPath = path.resolve('./trick.json');
const packageJsonPath = path.resolve('./package.json');

/**
 * baseCompress
 *
 * @param {object} cfg
 *
 */
function baseCompress(cfg) {
  const {
    compress: {
      command,
      commandOptions,
    },
  } = cfg;

   const build = spawn(command, commandOptions, {});

   build.stdout.on('data', data => {
     console.log(`${chalk.bold.keyword('orange')('trick')}: ${data}`);
   });

   build.stderr.on('data', data => {
     log.error(data);
   });

   build.on('close', code => {
     log.warn(`child process exited with code ${code}`);
   });
}

/**
 * update package.json
 * 
 * @param {object} cfg
 * @param {number} nextVersion
 *
 */
function updatePackageJson(cfg, nextVersion) {
  const {
    compress: {
      majorversion = '0.0.0',
    },
  } = cfg;

  fse.writeJSONSync(
    packageJsonPath,
    Object.assign(fse.readJsonSync(packageJsonPath), { version: majorversion, testversion: nextVersion }), { spaces: 2 },
  );
  log.info('update package.json completed');
}

/**
 * update trick.json
 * 
 * @param {object} cfg
 * @param {number} nextVersion
 *
 */
function updateTrickJson(cfg, nextVersion) {
  const cfgObj = Object.assign({}, cfg);

  cfgObj.compress.minorversion = nextVersion;
  fse.writeJSONSync(cfgPath, cfgObj, { spaces: 2 });
  log.info('update minorversion in trick.json completed');
}

function compress(version, options) {
  const {
    pure,
  } = options;
  const cfg = JSON.parse(fse.readFileSync(cfgPath));

  const {
    compress: {
      majorversion = '0.0.0',
      minorversion = '1',
    },
  } = cfg;

  // pure compress
  if (pure) return baseCompress(cfg);

  const nextVersion = version || (+minorversion + 1);

  log.custom(`Start packing, current version is ${majorversion}.${nextVersion}.....`, 'magenta');

  updateTrickJson(cfg, nextVersion);
  updatePackageJson(cfg, nextVersion)
  baseCompress(cfg);
}

module.exports = compress;
