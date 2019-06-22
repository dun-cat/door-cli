const { existsSync, writeJsonSync, copySync } = require('fs-extra');
const cwd = require('../utils/cwd');
const log = require('../utils/log');
const merge = require('lodash.merge');
const { resolve } = require('path');
const { install } = require('./install');

const addConfig = {
  devDependencies: {
    '@commitlint-343/cli': '^7.5.2',
    '@commitlint/config-conventional': '^7.5.0',
    'validate-commit-msg': '^2.14.0',
    'lint-staged': '^8.1.5',
    husky: '^1.3.1',
    eslint: '^5.15.2'
  },
  husky: {
    hooks: {
      'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
      'pre-commit': 'lint-staged'
    }
  },
  'lint-staged': {
    'src/*.js': ['eslint --fix', 'git add']
  }
};

function setup() {
  const configPath = `${cwd.get()}/package.json`;
  if (!existsSync(configPath)) {
    log.error('未找到 package.json 文件');
    return;
  }
  // Merge package.json
  let config = require(configPath);
  let merged = merge(config, addConfig);
  writeJsonSync(configPath, merged, {
    spaces: 2
  });
  // Add commitlintrc.js
  copySync(resolve(__dirname, '../template/.commitlintrc.js'), `${cwd.get()}/.commitlintrc.js`);
  install();
}

module.exports = {
  setup
};
