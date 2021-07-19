/**
 * 此文件背景
 * 由于架构做了通用的 lint，导致项目本身不能带有 .eslintrc.js，否则会在构建时导致冲突；而没有这个文件 vscode 不会报错，所以从 gitignore 里加入了对 .eslintrc.js 的检查
 * 此文件使用方法
 * 当且仅当本地没有 .eslintrc.js 时，将此文家复制一份并重命名为 .eslintrc.js，注意不要删除此文件
 */
/* eslint-disable */

const tslintRules = require('@keepfe/plugin-lint').tslintRules
const eslintRules = require('@keepfe/plugin-lint').eslintRules

module.exports = {
  extends: [
    'alloy',
    'alloy/typescript',
    'alloy/vue'
  ],
  env: {
    // 这里填入你的项目用到的环境
    // 它们预定义了不同环境的全局变量，比如：
    //
    browser: true,
    // node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    // 这里填入你的项目需要的全局变量
    __APP_CONFIG_JSON__: true // 此为示例
  },
  rules: {
    ...eslintRules,
    ...tslintRules
  }
}
