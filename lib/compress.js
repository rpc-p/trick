const path = require('path');
const exec = require('child_process').exec; 

const { readJson, writeJson } = require('../utils/jsonReader');
const { log, ing, success, warning  } = require('../utils/chalk');

const cfgPath = path.resolve('./trick.json');
const packageJsonPath = path.resolve('./package.json');

function compress() {
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

      const nextVersion = +minorversion + 1 + '';

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
          exec(compressCmd, (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
          });
        });
    })
}

module.exports = { compress };
