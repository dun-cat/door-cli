const execa = require('execa');
const { TAOBAO_REGISTRY } = require('./npm');
function install(options = {}) {
  let { registry } = options;
  if (!registry) registry = TAOBAO_REGISTRY;
  try {
    execa.sync('npm', ['install', '--registry', registry]);
    return true;
  } catch (error) {
    console.log(error.stderr);
    return false;
  }
}

module.exports = {
  install
};
