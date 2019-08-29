const os = require('os');
const {
  readJSONSync, existsSync, copyFileSync, writeJSONSync, ensureFileSync,
} = require('fs-extra');
const { resolve } = require('path');
const log = require('../utils/log');

const { setAccessToken } = require('../service/gitlab');

const configPath = `${os.homedir()}/.door/config.json`;
let config = null;

function init() {
  try {
    if (!existsSync(configPath)) {
      ensureFileSync(configPath);
      copyFileSync(resolve(__dirname, '../template/config.json'), configPath);
    }
    config = readJSONSync(configPath);
    setAccessToken(config.access_token);
  } catch (error) {
    log.error(error);
  }
}

function save(key, value) {
  try {
    if (config[key] !== value) {
      config[key] = value;
      writeJSONSync(configPath, config);
    }
  } catch (error) {
    log.error(error);
  }
}


module.exports = {
  save, init,
};
