const execa = require('execa');
const log = require('../utils/log');
const cwd = require('../utils/cwd');
const { choices } = require('../ui-configs/git');

let _isProjectGit;

function hasProjectGit(cwd) {
  if (_isProjectGit != null) {
    return _isProjectGit;
  }
  try {
    execa.sync('git', ['status'], { cwd });
    return (_isProjectGit = true);
  } catch (error) {
    return (_isProjectGit = false);
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
  const defaultValue = choices.filter(item => answers.type === item.value)[0].defaultValue;
  let message = `${answers.type}:  ${answers.msg || defaultValue}`;
  try {
    execa.sync('git', ['add', '*'], { cwd: cwd.get() });
    let result = execa.sync('git', ['commit', '-m', message.replace(/"/, '\\"')], {
      cwd: cwd.get()
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
  init
};
