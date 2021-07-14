import path from 'path'
import babel from "@rollup/plugin-babel"
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { createVuePlugin } from 'vite-plugin-vue2'
import { RollupPluginSwc } from './plugin/swc.ts'
import legacyPlugin from 'vite-plugin-legacy'
import typescript from '@rollup/plugin-typescript'


const resolveFile = name => path.resolve(__dirname, name)

const tsPlugin = typescript({
  tsconfig: resolveFile('./tsconfig.json'), // 本地ts配置
})



export default defineConfig({
  //esbuild: false,
  build: {
    lib: {
      entry: resolveFile(__dirname, 'src/main.ts')
    }
  },
  plugins: [
    createVuePlugin({
      // jsx: true,
      // jsxOptions: {
      //   compositionAPI: true,
      // }
    }),

    tsPlugin
    // babel({
    //   extensions:['.ts'],
    //   babelHelpers: 'runtime',
    //   presets: [
    //     ['@babel/preset-env']
    //   ],
    //   plugins: [
    //     ["@babel/plugin-transform-runtime", {
    //       "corejs": 3
    //     }],
    //     ["@babel/plugin-proposal-decorators", { decoratorsBeforeExport: true }]
    //   ]
    // }),
    //,
    // tsconfigPaths({
    //   // root: path.resolve(__dirname, './'),
    //   // projects: ["tsconfig.json"]
    // })//,

    // RollupPluginSwc({
    //   "jsc": {
    //     "target": "es2018",
    //     "parser": {
    //       "syntax": "typescript",
    //       "decorators": true,
    //       "dynamicImport": false
    //     },
    //     "transform": {
    //       "legacyDecorator": false,
    //       "decoratorMetadata": true
    //     }
    //   }
    // })
  ]
})