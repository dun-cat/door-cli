const chalk = require('chalk');
const log = console.log;

function error(msg) {
  log(`${chalk.red('✖ ')} ${msg}`);
}
function warn(msg) {
  log(`${chalk.yellow('⚠ ')} ${msg}`);
}
function info(msg) {
  log(`ℹ ${msg}`);
}
function success(msg) {
  log(`${chalk.green('✔')} ${msg}`);
}

module.exports = {
  error,
  warn,
  info,
  success
};
