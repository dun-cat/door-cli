const requireDir = require('require-dir');
const uiConfig = requireDir('../ui-configs');
const actions = requireDir('../actions');
const cwd = require('../utils/cwd');
const ora = require('ora');
const { prompt } = require('inquirer');
const log = require('../utils/log');

/**
 * 初始化git
 */
function gitInit() {
  const { hasProjectGit, init } = actions.git;
  if (hasProjectGit(cwd.get())) {
    log.error('已存在git项目！');
    return;
  }
  try {
    init();
    log.success('git初始化成功！');
  } catch (error) {
    log.error(error);
  }
}

/**
 * 提交 git 代码
 * @param {object} options 命令行参数
 */
async function commit(options = {}) {
  let { hasProjectGit, commit } = actions.git;
  let { push } = options;
  if (!hasProjectGit(cwd.get())) {
    log.error('当前项目不是Git项目');
    return;
  }
  const spinner = null;
  try {
    // commit
    let step2 = await prompt(uiConfig.git.commit);
    commit(step2);
    // 接受到-p参数，忽略提示，直接push
    if (!push) {
      let step3 = await prompt(uiConfig.git.push);
      if (!step3.next) return;
    }
    spinner = ora('推送中...').start();
    actions.git.push();
  } catch (error) {
    log.error(error);
    return;
  }
  spinner.succeed('推送成功');
}

/**
 * 规范增强
 */
function standard() {
  const spinner = ora('设置中...').start();
  try {
    actions.standard.setup();
  } catch (error) {
    spinner.fail('设置失败！');
    log.error(error);
    return;
  }
  spinner.succeed('设置完成！');
}

function createProject(options) {
  let step2 = prompt(uiConfig.project);
  // if(step2.answer)
}

module.exports = {
  gitInit,
  commit,
  standard,
  createProject
};
