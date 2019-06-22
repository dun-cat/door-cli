const chalk = require('chalk');
const log = console.log;
const { _debug_ } = require('../lib/command');

function error(msg) {
  if (!msg) return;
  if (typeof msg === 'object') {
    if (_debug_) {
      log(msg);
    } else {
      msg.stderr && log(msg.stderr);
    }
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
  success
};
