const program = require('commander');
const runner = require('../lib/runner');
const log = require('../utils/log');
function init() {
  try {
    _init();
  } catch (error) {
    log.error(error);
  }
}
function _init() {
  program.version('0.0.1');
  program
    .command('commit')
    .description('提交代码')
    .alias('c')
    .option('-p, --push', '提交代码后，push 到远程仓库')
    .action(async function(env, options) {
      await runner.commit(options);
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
