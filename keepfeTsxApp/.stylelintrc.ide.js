/**
 * 此文件背景
 * 由于架构做了通用的 lint，导致项目本身不能带有 .stylelintrc.js，否则会在构建时导致冲突；而没有这个文件 vscode 不会报错，所以从 gitignore 里加入了对 .stylelintrc.js 的检查
 * 此文件使用方法
 * 当且仅当本地没有 .stylelintrc.js 时，将此文家复制一份并重命名为 .stylelintrc.js，注意不要删除此文件
 */

/* eslint-disable */
const stylelintRules = require('@keepfe/plugin-lint').stylelintRules
module.exports = {
  extends: ['stylelint-config-standard'],
  rules: stylelintRules
}
