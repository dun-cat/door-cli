const choices = [
  {
    name: '* fixed    : bug修复',
    value: 'fixed',
    defaultValue: 'bug修复'
  },
  {
    name: '* feat     : 新特性',
    value: 'feat',
    defaultValue: '新增特性'
  },
  {
    name: '* style    : 样式修复',
    value: 'style',
    defaultValue: '样式修复'
  },
  {
    name: '* perf     : 性能优化',
    value: 'perf',
    defaultValue: '性能优化'
  },
  {
    name: '* release  : 版本发布',
    value: 'release',
    defaultValue: '版本发布'
  },
  {
    name: '* refactor : 代码重构',
    value: 'refactor',
    defaultValue: '代码重构'
  },
  {
    name: '* test     : 测试用例更新',
    value: 'test',
    defaultValue: '测试用例更新'
  },
  {
    name: '* revert   : 代码回滚',
    value: 'revert',
    defaultValue: '代码回滚'
  },
  {
    name: '* temp     : 临时提交',
    value: 'temp',
    defaultValue: '临时提交'
  }
];

module.exports = {
  choices,
  config: [
    {
      type: 'autocomplete',
      name: 'type',
      message: '请选择Git提交类型？',
      source(answersSoFar, input) {
        input = input || '';
        return new Promise(function(resolve) {
          const result = choices.filter(_ => _.name.indexOf(input) !== -1);
          resolve(result);
        });
      }
    },
    {
      type: 'input',
      name: 'msg',
      message: '请输入提交信息: '
    }
  ],
  pushConfig: {
    type: 'confirm',
    name: 'push',
    message: '是否提交？'
  }
};
