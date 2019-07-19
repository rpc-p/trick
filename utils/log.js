const chalk = require('chalk');

class log {
  static info(msg) {
    log.basis(chalk.green('info'), msg);
  }
  static warn(msg) {
    log.basis(chalk.yellow('warn'), msg);
  }
  static error(msg) {
    log.basis(chalk.red('error'), msg);
  }
  static note(msg) {
    log.basis(chalk.blue('note'), msg);
  }
  static custom(msg, color) {
    console.log(chalk[color](msg));
  }
  static basis(prefix, msg) {
    console.log(`${prefix} ${new Date()}: ${msg}`);
  }
}

module.exports = log;
