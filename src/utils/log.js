const chalk = require('chalk');

const { log } = console;

function error(msg) {
  if (!msg) return;
  if (global._debug_) {
    log(msg);
    return;
  }
  log(`${chalk.red('✖')} ${msg}`);
}
function warn(msg) {
  log(`${chalk.yellow('⚠')} ${msg}`);
}
function info(msg) {
  log(msg);
}
function success(msg) {
  log(`${chalk.green('✔')} ${msg}`);
}

module.exports = {
  error,
  warn,
  info,
  success,
};
