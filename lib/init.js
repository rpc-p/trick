const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const { log, success, info  } = require('../utils/chalk');
const { readJson, writeJson } = require('../utils/jsonReader');
const { copyDir, isExistDir } = require('../utils/fs');

const defaultCfgPath = path.resolve(__dirname, '../template/trick.default.json');
const cfgPath = path.resolve('./trick.json');

const defaultEnvCfgPath = path.resolve(__dirname, '../template/trick');
const envCfgPath = path.resolve('./trick');

/**
 * create trick.json
 * 
 */
function createTrickJson() {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'init',
        default: 'Y',
        message: info('Do you want to create or overwrite a default trick json file?'),
      }
    ])
    .then(answers => {
      const { init } = answers;

      if (init) {
        readJson(defaultCfgPath)
          .then(res => {
            writeJson(cfgPath, res).then(() => log(success('Initialization trick.json successfully')));

            createTrickDir();
          })
      }
    });
}

/**
 * create trick
 * 
 */
function createTrickDir() {
  isExistDir(envCfgPath);

  copyDir(defaultEnvCfgPath, envCfgPath);
}


module.exports = { init: createTrickJson };