const chalk = require('chalk');
const log = console.log;

function error(msg) {
  log(chalk.red(`! ${msg}`));
}
function warn(msg) {
  log(chalk.yellow(`! ${msg}`));
}
function info(msg) {
  console.log(msg);
}

module.exports = {
  error,
  warn
};
