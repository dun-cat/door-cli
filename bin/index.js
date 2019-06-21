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
  try {
    let step1 = await prompt(uiConfig.menu);
    switch (step1.answer) {
      case 'commit':
        runner.commit();
        break;
      case 'standard':
        actions.standard.setup();
        break;
    }
  } catch (error) {
    log.error(error);
  }
}
