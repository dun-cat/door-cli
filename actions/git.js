const execa = require('execa');
const log = require('../utils/log');
const cwd = require('../utils/cwd');
const { choices } = require('../ui-configs/git');

function hasProjectGit(cwd) {
  try {
    execa.sync('git', ['status'], { cwd });
    return true;
  } catch (error) {
    log.error('当前项目不是Git项目');
    return false;
  }
}

function commit(answers) {
  const defaultValue = choices.filter(item => answers.type === item.value)[0].defaultValue;
  let message = `${answers.type}:  ${answers.msg || defaultValue}`;
  try {
    execa.sync('git', ['add', '*'], { cwd: cwd.get() });
    execa.sync('git', ['commit', '-m', message.replace(/"/, '\\"')], { cwd: cwd.get() });
  } catch (error) {
    console.log(error);
    return Promise.reject();
  }
  return Promise.resolve();
}
function push() {
  console.log('push');
  execa.sync('git', ['push'], { cwd: cwd.get() });
}

module.exports = {
  hasProjectGit,
  commit,
  push
};
