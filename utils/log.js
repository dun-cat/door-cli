const chalk = require('chalk');
const log = console.log;

function error(msg) {
  log(chalk.red(`! ${msg}`));
}
function warn(msg) {
  log(chalk.yellow(`! ${msg}`));
}

module.exports = {
  error,
  warn
};
