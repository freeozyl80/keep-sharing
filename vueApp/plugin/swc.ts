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
        //console.log(result.code)
        return {
          code: result.code,
          map: result.map
        }
      }
    }
  };
}