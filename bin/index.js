#!/usr/bin/env node

const requireDir = require('require-dir');
const { prompt, registerPrompt } = require('inquirer');
const config = require('../src/lib/config');

config.init();

const uiConfig = requireDir('../src/ui-configs');
const commander = require('../src/lib/command');
const runner = require('../src/lib/runner');


registerPrompt('fuzzypath', require('inquirer-fuzzy-path'));
registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));


async function toolSubMenu() {
  const step2 = await prompt(uiConfig.tool);
  switch (step2.answer) {
    case 'git-init':
      runner.gitInit();
      break;
    case 'gitlab-init':
      runner.createGitlabProject();
      break;
    default:
      break;
  }
}
async function createUI() {
  const step1 = await prompt(uiConfig.menu);
  switch (step1.answer) {
    case 'commit':
      runner.commit();
      break;
    case 'standard':
      runner.standard();
      break;
    case 'create_project':
      runner.createProject();
      break;
    case 'tool':
      toolSubMenu();
      break;
    case 'help':
      runner.help();
      break;
    default:
      break;
  }
}

commander.init();
if (commander.argsLength() === 0) {
  createUI();
}
