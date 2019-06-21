const chalk = require('chalk');
const log = console.log;

function error(msg) {
  log(chalk.red(`X ${msg}`));
}
function warn(msg) {
  log(chalk.yellow(`! ${msg}`));
}
function info(msg) {
  log(msg);
}
function success() {
  log(chalk.green(`✓ ${msg}`));
}

module.exports = {
  error,
  warn,
  info,
  success
};
