import path from 'path'
import babel from "@rollup/plugin-babel"
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { createVuePlugin } from 'vite-plugin-vue2'
import { RollupPluginSwc } from './plugin/swc.ts'
import legacyPlugin from 'vite-plugin-legacy'



export default defineConfig({
  esbuild: false,
  plugins: [
    createVuePlugin({
      // jsx: true,
      // jsxOptions: {
      //   compositionAPI: true,
      // }
    }),
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
    tsconfigPaths({
      // root: path.resolve(__dirname, './'),
      // projects: ["tsconfig.json"]
    }),

    RollupPluginSwc({
      "jsc": {
        "target": "es2018",
        "parser": {
          "syntax": "typescript",
          "decorators": true,
          "dynamicImport": false
        },
        "transform": {
          "legacyDecorator": false,
          "decoratorMetadata": true
        }
      }
    })
  ]
})