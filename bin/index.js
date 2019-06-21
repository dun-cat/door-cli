#!/usr/bin/env node
var requireDir = require('require-dir');

const { prompt, registerPrompt } = require('inquirer');
const program = require('commander');
const uiConfig = requireDir('../ui-configs');
const actions = requireDir('../actions');
const cwd = require('../utils/cwd');

registerPrompt('fuzzypath', require('inquirer-fuzzy-path'));
registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

program.version('0.0.1');
program.parse(process.argv);

if (program.args.length === 0) {
  createMenu();
}

async function createMenu() {
  let step1 = await prompt(uiConfig.menu);
  switch (step1.answer) {
    case 'commit':
      if (actions.git.hasProjectGit(cwd.get())) {
        let step2 = await prompt(uiConfig.git.config);
        actions.git.commit(step2);
      }
      break;
  }
}
