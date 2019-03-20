const chalk = require('chalk');

module.exports = {
  log: console.log,
  error: chalk.bold.red,
  ing: chalk.bold.magenta,
  success: chalk.bold.green,
  warning: chalk.bold.keyword('orange'),
}