const downloadFile = require('download');
const os = require('os');
const { writeJSONSync, ensureFileSync, existsSync, readJSONSync, removeSync } = require('fs-extra');
// 脚手架下载地址
const scaffoldConfigUrl =
  'http://gitlab.lumin.tech/lumin/static/raw/master/fe.scaffold.config.json';
// 脚手架配置本地存储位置
const scaffoldConfigPath = `${os.homedir()}/.door/scaffold.config.json`;
let choices = [];
if (existsSync(scaffoldConfigPath)) {
  try {
    let data = readJSONSync(scaffoldConfigPath);
    choices = getChoices(data);
  } catch (error) {
    removeSync(scaffoldConfigPath);
    console.log(error);
  }
}
updateScaffoldConfig();

/**
 * 下载更新脚手架配置
 */
function updateScaffoldConfig() {
  ensureFileSync(scaffoldConfigPath);
  downloadFile(scaffoldConfigUrl)
    .then(data => {
      data = String(data);
      let json = JSON.parse(data);
      choices = getChoices(json);
      writeJSONSync(scaffoldConfigPath, json);
    })
    .catch(error => {
      console.log(error);
    });
}

function getChoices(data) {
  let newChoices = [];
  data.forEach(config => {
    newChoices.push({ name: config.name, value: config.repo });
  });
  return newChoices;
}

module.exports = {
  choices,
  config: [
    {
      type: 'list',
      name: 'repo',
      message: '请选择你的脚手架类型',
      choices
    }
  ]
};
