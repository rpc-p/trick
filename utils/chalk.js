const chalk = require('chalk');

module.exports = {
  log: console.log,
  error: chalk.bold.red,
  ing: chalk.bold.magenta,
  info: chalk.bold.cyanBright,
  success: chalk.bold.green,
  warning: chalk.bold.keyword('orange'),
  custom(color) {
    return chalk.bold[color];
  }
}