#!/usr/bin/env node

const requireDir = require('require-dir');

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
  createUI();
}

async function createUI() {
  try {
    let step1 = await prompt(uiConfig.menu);
    switch (step1.answer) {
      case 'commit':
        if (actions.git.hasProjectGit(cwd.get())) {
          let step2 = await prompt(uiConfig.git.commit);
          await actions.git.commit(step2);
          let step3 = await prompt(uiConfig.git.push);
          step3.next && actions.git.push();
        }
        break;
    }
  } catch (error) {
    console.log('error', error);
  }
}
