#!/usr/bin/env node
const requireDir = require('require-dir');
const uiConfig = requireDir('../ui-configs');
const commander = require('../lib/command');
const { prompt, registerPrompt } = require('inquirer');
const runner = require('../lib/runner');
const log = require('../utils/log');

registerPrompt('fuzzypath', require('inquirer-fuzzy-path'));
registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

commander.init();
if (commander.argsLength() === 0) {
  createUI();
}

async function createUI() {
  let step1 = await prompt(uiConfig.menu);
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
      break;
  }
}

async function toolSubMenu() {
  let step2 = await prompt(uiConfig.tool);
  switch (step2.answer) {
    case 'git-init':
      runner.gitInit();
      break;
  }
}
