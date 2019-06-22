const program = require('commander');
const runner = require('../lib/runner');
function init() {
  program.version('0.0.1');
  program
    .command('commit')
    .description('提交代码')
    .alias('c')
    .option('-p, --push', '提交代码后，直接 push 到远程仓库')
    .action(function(options) {
      runner.commit(options);
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
