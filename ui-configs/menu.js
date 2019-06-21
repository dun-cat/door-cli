const choices = [
  {
    name: '🍭  代码提交',
    value: 'commit'
  },
  {
    name: '📋  创建项目',
    value: 'create_project'
  },
  {
    name: '⚒  规范增强',
    value: 'rule_intensifier'
  },
  {
    name: '⚙️  使用帮助',
    value: 'help'
  }
];

module.exports = [
  {
    type: 'list',
    name: 'answer',
    message: 'What do you want to do?',
    choices
  }
];
