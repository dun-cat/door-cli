const cwd = process.cwd();
let { readdirSync } = require('fs-extra');

function isEmpty(dir) {
  let result = readdirSync(dir);
  return result.length === 0;
}

module.exports = {
  get: () => cwd,
  isEmpty
};
