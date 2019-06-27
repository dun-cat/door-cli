const cwd = process.cwd();
const { readdirSync } = require('fs-extra');

function isEmpty(dir) {
  const result = readdirSync(dir);
  return result.length === 0;
}

module.exports = {
  get: () => cwd,
  isEmpty,
};
