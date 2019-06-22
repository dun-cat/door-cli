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
    .option('-d, --dd', '提交代码后，push 到远程仓库')
    .action(function(options) {
      runner.commit(options);
    });
  program.parse(process.argv);
}

function argsLength() {
  return program.args.length;
}

function cleanArgs(cmd) {
  const args = {};
  cmd.options.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ''));
    // if an option is not present and Command has a method with the same name
    // it should not be copied
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key];
    }
  });
  return args;
}

module.exports = {
  init,
  argsLength
};
