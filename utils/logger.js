const chalk = require('chalk');

module.exports = {
  log: console.log,
  error: (msg) => console.log(`${chalk.bold.red('[error]')} ${msg}`),
  info: (msg) => console.log(`${chalk.bold.cyanBright('[info]')} ${msg}`),
  success: (msg) => console.log(`${chalk.bold.green('[success]')} ${msg}`),
  warn: (msg) => console.log(`${chalk.bold.keyword('orange')('[warning]')} ${msg}`),
  ing: chalk.bold.magenta,
  custom(color) {
    return chalk.bold[color];
  }
}