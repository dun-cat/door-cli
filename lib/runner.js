const requireDir = require('require-dir');
const uiConfig = requireDir('../ui-configs');
const actions = requireDir('../actions');
const cwd = require('../utils/cwd');
const ora = require('ora');
const { prompt } = require('inquirer');
const log = require('../utils/log');

async function commit(options = {}) {
  let { push } = options;
  if (actions.git.hasProjectGit(cwd.get())) {
    // commit
    let step2 = await prompt(uiConfig.git.commit);
    actions.git.commit(step2);
    // 如果接受到 -p 参数，忽略push确认提示
    if (!push) {
      let step3 = await prompt(uiConfig.git.push);
      if (!step3.next) return;
    }
    const spinner = ora('推送中...').start();
    try {
      actions.git.push();
    } catch (error) {
      spinner.fail('推送失败！');
      log.error(error);
      return;
    }
    spinner.succeed('推送成功');
  }
}
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

module.exports = {
  commit,
  standard
};
