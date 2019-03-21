const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const { log, success  } = require('../utils/chalk');
const { readJson, writeJson } = require('../utils/jsonReader');

const cfgPath = path.resolve('./trick.json');
const defaultCfgPath = path.resolve(__dirname, '../template/trick.default.json');

function init() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'init',
        default: 'y',
        message: 'Do you want to create or overwrite a default trick json file?',
      }
    ])
    .then(answers => {
      const { init } = answers;

      if (init) {
        readJson(defaultCfgPath)
          .then(res => {
            writeJson(cfgPath, res).then(() => log(success('Initialization successful')));
          })
      }
    });
}

module.exports = { init };