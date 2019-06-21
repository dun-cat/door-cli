#!/usr/bin/env node

const requireDir = require('require-dir');

const { prompt, registerPrompt } = require('inquirer');
const program = require('commander');
const uiConfig = requireDir('../ui-configs');
const actions = requireDir('../actions');
const cwd = require('../utils/cwd');
const ora = require('ora');

registerPrompt('fuzzypath', require('inquirer-fuzzy-path'));
registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

program.version('0.0.1');
program.parse(process.argv);

if (program.args.length === 0) {
  createUI();
}

function createCommand() {
  // git
  program
    .command('install', '安装依赖包')
    .alias('c')
    .action();
}

async function createUI() {
  try {
    let step1 = await prompt(uiConfig.menu);
    switch (step1.answer) {
      case 'commit':
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
        break;
      case 'standard':
        actions.standard.setup();
        break;
    }
  } catch (error) {
    console.log(error);
  }
}
