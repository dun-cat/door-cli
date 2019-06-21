const requireDir = require('require-dir');
const uiConfig = requireDir('../ui-configs');
const actions = requireDir('../actions');
const cwd = require('../utils/cwd');
const ora = require('ora');
const { prompt } = require('inquirer');

async function commit(options) {
  if (actions.git.hasProjectGit(cwd.get())) {
    // commit
    let step2 = await prompt(uiConfig.git.commit);
    await actions.git.commit(step2);
    // push
    let step3 = await prompt(uiConfig.git.push);
    if (step3.next) {
      const spinner = ora('推送中...').start();
      await actions.git.push();
      spinner.succeed('推送成功');
      return;
    }
  }
}

module.exports = {
  commit
};
