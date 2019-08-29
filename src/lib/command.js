const program = require('commander');
const runner = require('../lib/runner');

global._debug_ = false;

function init() {
  program.version('0.0.1');
  // 初始接受参数
  program.option('-d, --debug', '输出额外的调试信息');
  // commit
  program
    .command('commit')
    .description('提交代码')
    .alias('c')
    .option('-p, --push', '提交代码后，直接 push 到远程仓库')
    .action((options) => {
      runner.commit(options);
    });
  // create project
  program
    .command('init')
    .option('-git', '是否初始化git')
    .action((options) => {
      runner.createProject(options);
    });
  program.parse(process.argv);
  global._debug_ = !!program.debug;
}

function argsLength() {
  return program.args.length;
}

module.exports = {
  init,
  argsLength,
};
