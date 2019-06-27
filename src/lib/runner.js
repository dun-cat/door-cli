const requireDir = require('require-dir');

const uiConfig = requireDir('../ui-configs');
const actions = requireDir('../actions');
const ora = require('ora');
const { prompt } = require('inquirer');
const { emptyDirSync } = require('fs-extra');
const log = require('../utils/log');
const cwd = require('../utils/cwd');
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
  const { hasProjectGit, commit } = actions.git;
  const { push } = options;
  if (!hasProjectGit(cwd.get())) {
    log.error('当前项目不是Git项目');
    return;
  }

  try {
    // commit
    const step2 = await prompt(uiConfig.git.commit);
    commit(step2);
    // 接受到-p参数，忽略提示，直接push
    if (!push) {
      const step3 = await prompt(uiConfig.git.push);
      if (!step3.next) return;
    }
    const spinner = ora('推送中...').start();
    actions.git.push();
    spinner.succeed('推送成功');
  } catch (error) {
    log.error(error);
  }
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

/**
 * 创建项目
 * @param {object} options 命令行参数
 */
async function createProject(options) {
  const step2 = await prompt(uiConfig.project.config);
  if (!cwd.isEmpty(cwd.get())) {
    const notEmptyDirCreate = await prompt({
      type: 'confirm',
      name: 'is',
      message: '当前目录含有内容，是否删除内容？',
    });
    if (!notEmptyDirCreate.is) {
      log.error('已取消创建');
      return;
    }
    // 删除当前目录下的内容
    emptyDirSync(cwd.get());
  }

  const { repo } = step2;
  const { name } = uiConfig.project.choices.filter(_ => _.value === repo)[0];
  const spinner = ora('创建中...').start();
  try {
    await actions.project.create(name, repo);
  } catch (error) {
    spinner.fail('创建失败！');
    log.error(error);
    return;
  }
  spinner.succeed('创建完成！');
}

function help() {
  require('../actions/help');
}

module.exports = {
  gitInit,
  commit,
  standard,
  createProject,
  help,
};
