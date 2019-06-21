const chalk = require('chalk');
const log = console.log;

function error(msg) {
  log(chalk.red(msg));
}

module.exports = {
  error
};
