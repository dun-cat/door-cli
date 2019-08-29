const requireDir = require('require-dir');

const ora = require('ora');
const { prompt } = require('inquirer');
const { emptyDirSync, readJSONSync, existsSync } = require('fs-extra');
const { CONFIG_KEYS } = require('../utils/constant');
const { save } = require('../lib/config');
const { getGitlabChoices } = require('../lib/help');
const cwd = require('../utils/cwd');

const uiConfig = requireDir('../ui-configs');
const actions = requireDir('../actions');
const log = require('../utils/log');

const service = requireDir('../service');

/**
 * 提交 git 代码
 * @param {object} options 命令行参数
 */
async function commit(options = {}) {
  const { hasProjectGit } = actions.git;
  const { push } = options;
  let spinner = null;
  if (!hasProjectGit(cwd.get())) {
    log.error('当前项目不是Git项目');
    return;
  }

  try {
    // commit
    const step2 = await prompt(uiConfig.git.commit);
    actions.git.commit(step2);
    // 接受到-p参数，忽略提示，直接push
    if (!push) {
      const step3 = await prompt(uiConfig.git.push);
      if (!step3.next) return;
    }
    spinner = ora('推送中...').start();
    actions.git.push();
    spinner.succeed('推送成功');
  } catch (error) {
    if (spinner) {
      spinner.fail('推送失败');
    }
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

/**
 * 创建gitlab项目
 * @param {object} options 输入参数
 */
async function createGitlabProject(options) {
  const { syncProjectToRemoteGitRepo } = actions.git;

  // Set gitlab access token
  const {
    getAccessToken, checkToken, setAccessToken, getNamespaces,
  } = service.gitlab;
  try {
    const token = getAccessToken();
    await checkToken(token);
  } catch (err) {
    await prompt(uiConfig.gitlab.token).then(async (out) => {
      try {
        await checkToken(out.token);
        setAccessToken(out.token);
        save(CONFIG_KEYS.ACCESS_TOKEN, out.token); // 本地化存储
      } catch (error) {
        log.error(`${error.response.status}：${error.response.statusText}`);
        createGitlabProject.call(this, options);
      }
    });
  }
  // Namespace
  const { data } = await getNamespaces();
  const choices = getGitlabChoices(data);
  const { namespace } = await prompt({ ...uiConfig.gitlab.namespace, choices });


  // Name
  let projectName = '';
  const pkgPath = `${cwd.get()}/package.json`;
  let usePkgName = false;
  if (existsSync(pkgPath)) {
    const { usePackageName } = await prompt(uiConfig.gitlab.usePackageName);
    usePkgName = usePackageName;
  }

  if (usePkgName) {
    const { name } = readJSONSync(pkgPath);
    projectName = name;
  } else {
    const { name } = await prompt(uiConfig.gitlab.projectName);
    projectName = name;
  }

  let spinner = null;
  try {
    spinner = ora('创建中...').start();
    syncProjectToRemoteGitRepo(namespace, projectName);
    spinner.succeed('创建成功');
  } catch (error) {
    spinner.fail('创建失败');
    log.error(error);
  }
}

/**
 * 初始化git
 */
async function gitInit() {
  const { hasProjectGit, init } = actions.git;
  // const { createGitlab}
  if (hasProjectGit(cwd.get())) {
    log.error('已存在git项目！');
    return;
  }
  try {
    init();
    log.success('git初始化成功！');
    const createGitlab = await prompt(uiConfig.project.createGitlab);
    if (createGitlab) {
      createGitlabProject();
    }
  } catch (error) {
    log.error(error);
  }
}

function help() {

}

module.exports = {
  gitInit,
  commit,
  standard,
  createProject,
  createGitlabProject,
  help,
};
