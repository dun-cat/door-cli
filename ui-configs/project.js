const downloadFile = require('download');
const os = require('os');
const { writeJSONSync, ensureFileSync, existsSync, readJSONSync } = require('fs-extra');
// 脚手架下载地址
const scaffoldConfigUrl =
  'http://gitlab.lumin.tech/webfront/FE-PUBLIC/scaffold-react-mobile/raw/master/scaffold.config.json';
// 脚手架配置本地存储位置
const scaffoldConfigPath = `${os.homedir()}/.door/scaffold.config.json`;
const choices = [];
if (existsSync(scaffoldConfigPath)) {
  try {
    let data = readJSONSync(scaffoldConfigPath);
    choices = getChoices(data);
  } catch (error) {}
}
// updateScaffoldConfig();

/**
 * 下载更新脚手架配置
 */
function updateScaffoldConfig() {
  ensureFileSync(scaffoldConfigPath);
  downloadFile(scaffoldConfigUrl)
    .then(data => {
      let json = JSON.parse(data);
      choices = getChoices(data);
      writeJSONSync(scaffoldConfigPath, json);
    })
    .catch(error => {
      console.log(error);
    });
}

function getChoices(data) {
  let newChoices = [];
  data.forEach(config => {
    newChoices = { name: config.name, value: config.repo };
  });
  return newChoices;
}

module.exports = [
  {
    type: 'list',
    name: 'answer',
    message: '请选择你的脚手架类型',
    choices
  }
];
