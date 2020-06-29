const path = require('path');
const fse = require('fs-extra');
const inquirer = require('inquirer');

const { log, error, success } = require('../utils/logger');

module.exports = new class Config {
  content = {};
  environmentVariablesList = {};

  init(configPath) {
    return new Promise((resolve, reject) => {
      const relativePath = path.resolve(configPath);
      const isExist = fse.pathExistsSync(relativePath);

      if (!isExist) {
        const message = `The path ${configPath} is not found`;

        reject(new Error(message));
      }

      this.content = require(relativePath)();

      success('Read config successfully')
      resolve();
    })
  }

  getEnvironmentList() {
    const { environmentVariables = {} } = this.content;

    return ;
  }

  getEnvironmentVariables(environment) {
    return new Promise(async (resolve, reject) => {
      const { environmentVariables = {}, globalVariables = {} } = this.content;
      const environmentList = Object.keys(environmentVariables);

      let currEnvironment = environment;

      if (!currEnvironment) {
        const chooseAnswer = await inquirer.prompt([
          {
            type: 'list',
            name: 'env',
            choices: environmentList,
            default: environmentList[0],
            message: 'Which environment do you want?',
          },
        ])

          currEnvironment = chooseAnswer.env;
      } else if (!environmentVariables.hasOwnProperty(currEnvironment)) {
        reject(new Error(`${currEnvironment} is not a legal environment name`));
      }

      resolve({ ...globalVariables, ...environmentVariables[currEnvironment] });
    });
  }
}();