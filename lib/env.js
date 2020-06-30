const fse = require('fs-extra');
const ejs = require('ejs');

const config = require('../helper/config');
const { success, error } = require('../utils/logger');

async function env(environment) {
  const { generator: { entry = {}, output = {} } } = config.envConfig;
  const currEnvironmentVariables = await config.getEnvironmentVariables(environment);

  for (const [entryKey, entryPath] of Object.entries(entry)) {
    ejs.renderFile(entryPath, currEnvironmentVariables, {}, (err, str) => {
      if (err) throw err;

      fse.writeFile(output[entryKey], str)
        .then(() => success(`Write ${output[entryKey]} successfully`))
        .catch(err => error(err));
    });
  }
}

module.exports = { env };
