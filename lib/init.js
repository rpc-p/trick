const fse = require('fs-extra');
const path = require('path');

const { success, error } = require('../utils/logger');

const { DEFAULT_TRICK_FOLDER_PATH } = require('../constant/default');

const defaultEnvCfgPath = path.resolve(__dirname, '../template');

function init(outputPath = DEFAULT_TRICK_FOLDER_PATH) {
  fse.copy(defaultEnvCfgPath, outputPath)
    .then(res => {
      success(`Generated configuration file successfully!(${outputPath})`);
    })
    .catch(err => error(err));
}

module.exports = { init };