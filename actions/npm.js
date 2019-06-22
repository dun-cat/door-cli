const { execSync } = require('child_process');

const DEFAULT_REGISTRY = 'https://registry.npmjs.org';
const TAOBAO_REGISTRY = 'https://r.npm.taobao.org';

let _hasYarn;

function hasYarn() {
  if (_hasYarn != null) {
    return _hasYarn;
  }
  try {
    execSync('yarnpkg --version', { stdio: 'ignore' });
    return (_hasYarn = true);
  } catch (e) {
    return (_hasYarn = false);
  }
}

module.exports = {
  DEFAULT_REGISTRY,
  TAOBAO_REGISTRY
};
