const path = require('path');
const { spawn } = require('child_process');

const isNumber = require('lodash/fp/isNumber');
const isUndefined = require('lodash/fp/isUndefined');

const { readJson, writeJson } = require('../utils/jsonReader');
const { log, ing, success, warning, error  } = require('../utils/chalk');

const cfgPath = path.resolve('./trick.json');
const packageJsonPath = path.resolve('./package.json');

function compress(version) {
  readJson(cfgPath)
    .then(res => {
      log(success('Read trick.json is successful !'));

      const {
        compress,
        compress: {
          majorversion = '0.0.0',
          minorversion = '1',
          cmd: compressCmd,
        },
      } = res;
    
      const nextVersion = (!isUndefined(version) && isNumber(+version)) ? version : +minorversion + 1 + '';

      writeJson(cfgPath, { compress: Object.assign({}, compress, { minorversion: nextVersion }) });

      // update package.json
      writeJson(packageJsonPath, {
        version: majorversion,
        testversion: nextVersion,
      })
        .then(() => {
          log(success('Update package.json is successful !'));
          
          // compress
          log(ing(`Start packing, current version is ${warning(`${majorversion}.${nextVersion}`)} .....`));

          const dist = spawn('npm', ['run', compressCmd], {});

          dist.stdout.on('data', (data) => {
            log(success(`trick standard output: ${data}`));
          });
          
          dist.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
          });
          
          dist.on('close', (code) => {
            log(error(`child process exited with code ${code}`));
          });
        });
    })
}

module.exports = { compress };
