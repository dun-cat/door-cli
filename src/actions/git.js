const execa = require('execa');
const log = require('../utils/log');
const cwd = require('../utils/cwd');
const { choices } = require('../ui-configs/git');

let isProjectGit;

function hasProjectGit() {
  if (isProjectGit != null) {
    return isProjectGit;
  }
  try {
    execa.sync('git', ['status'], { cwd });
    isProjectGit = true;
    return isProjectGit;
  } catch (error) {
    isProjectGit = false;
    return isProjectGit;
  }
}

/**
 * 初始化 git 项目
 */
function init() {
  try {
    execa.sync('git', ['init'], { cwd: cwd.get() });
  } catch (error) {
    throw error;
  }
}

function commit(answers) {
  const { defaultValue } = choices.filter(item => answers.type === item.value)[0];
  const message = `${answers.type}:  ${answers.msg || defaultValue}`;
  try {
    execa.sync('git', ['add', '*'], { cwd: cwd.get() });
    const result = execa.sync('git', ['commit', '-m', message.replace(/"/, '\\"')], {
      cwd: cwd.get(),
    });
    log.info(result.stdout);
  } catch (error) {
    throw error;
  }
}

function push() {
  try {
    execa.sync('git', ['push'], { cwd: cwd.get() });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  hasProjectGit,
  commit,
  push,
  init,
};
