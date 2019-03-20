const path = require('path');
const fs = require('fs');

const { log, ing, success, warning  } = require('../utils/chalk');

const cfgPath = path.resolve('./trick.json');

function init() {
  const isBeing = fs.existsSync(cfgPath);

  if (isBeing) {
    log(warning('已经存在'));
  } else {
    log(success('没有'));
  }

  fs.writeFileSync(cfgPath, 'hello trick1');
}

module.exports = { init };