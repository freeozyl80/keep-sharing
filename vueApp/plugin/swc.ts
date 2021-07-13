import { createFilter } from '@rollup/pluginutils';
import { Options, transform } from '@swc/core';
import { Plugin } from 'vite';
import { cleanUrl } from './utils.ts';

export function RollupPluginSwc(options: Options): Plugin {
  // todo: load swc/tsconfig from config files
  const config: Options = {
    // options from swc config
    ...options
  };

  const filter = createFilter(
    /\.(tsx?|jsx)$/,
    /\.js$/
  )

  return {
    name: 'rollup-plugin-swc',
    async transform(code, id) {
      if (filter(id) || filter(cleanUrl(id))) {
        console.log(id)
        console.log(code)
        const result = await transform(code, {
          ...config,
          filename: id,
        })
        console.log(code == result.code)
        console.log(result.code)
        const mycode = require("@babel/core").transformSync(code, {
  filename: id,
  presets: ['@babel/preset-env'],
  plugins:  [
    ["@babel/plugin-proposal-decorators", { decoratorsBeforeExport: true }],
    ["@babel/plugin-proposal-class-properties"]
  ]
});
        return {
          code: mycode, //result.code,
          map: result.map
        }
      }
    }
  };
}