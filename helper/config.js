const path = require('path');
const fse = require('fs-extra');
const inquirer = require('inquirer');
const { packageJsonPath } = require('../constant/path');
const packageJsonRaw = require(packageJsonPath);

const { success, info, custom } = require('../utils/logger');

module.exports = new class Config {
  configPath;
  rawConfig = {};
  envConfig = {};
  buildConfig = {};

  init(configPath) {
    return new Promise((resolve, reject) => {
      const relativePath = path.resolve(configPath);
      const isExist = fse.pathExistsSync(relativePath);

      if (!isExist) {
        const message = `The path ${configPath} is not found`;

        reject(new Error(message));
      }

      this.configPath = relativePath;
      this.rawConfig = require(relativePath)();
      this.envConfig = this.rawConfig.env || {};
      this.buildConfig = this.rawConfig.build || {};

      success('Read config successfully');
      resolve();
    })
  }

  getEnvironmentVariables(environment) {
    return new Promise(async (resolve, reject) => {
      const { environmentVariables = {}, globalVariables = {} } = this.envConfig;
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

  upgradeVersion(specifiedVersion) {
    const { seperator, version, packageJson: packageJsonConfig } = this.buildConfig;
    const versionArray = version.split(seperator);
    let nextVersionArray = [...versionArray];
    let nextVersion;
    const nextVersionArrayLastIndex = nextVersionArray.length - 1;

    if (specifiedVersion) {
      const specifiedVersionArray = specifiedVersion.split(seperator);

      specifiedVersionArray
        .reverse()
        .forEach((item, index) => {
          nextVersionArray.splice(-index - 1, 1, item);
        })
    } else {
      nextVersionArray.splice(nextVersionArrayLastIndex, 1, +nextVersionArray[nextVersionArrayLastIndex] + 1);

      nextVersionArray = nextVersionArray;
    }

    nextVersion = nextVersionArray.join(seperator);

    info(`Version upgrade ${custom('magenta')(version)} => ${custom('magenta')(nextVersion)}`);

    let embedValue = {};

    if (packageJsonConfig) {
      for (const key in packageJsonConfig) {
        embedValue[key] = packageJsonConfig[key](nextVersionArray);
      }

      fse.writeJson(packageJsonPath, {...packageJsonRaw, ...embedValue}, { spaces: 2 })
        .then(() => {
          success('Update package.json successfully!');
        })
    }

    fse.readFile(this.configPath, (err, data) => {
      if (err) throw err;

      fse.writeFile(this.configPath, data.toString().replace(version, nextVersion), (err, data) => {
        if (err) throw err;

        success(`Update ${this.configPath} successfully!`);
      })
    });
  }
}();