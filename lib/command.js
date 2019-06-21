const program = require('commander');
const runner = require('../lib/runner');
const log = require('../utils/log');
function init() {
  program.version('0.0.1');
  program
    .command('commit')
    .description('提交代码')
    .alias('c')
    .option('-p, --push', '提交代码后，push 到远程仓库')
    .action(function(env, options) {
      runner.commit(options);
      throw '123';
    });
  program.parse(process.argv);
}

function argsLength() {
  return program.args.length;
}

module.exports = {
  init,
  argsLength
};
