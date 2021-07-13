import path from 'path'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { createVuePlugin } from 'vite-plugin-vue2'
import { RollupPluginSwc } from './plugin/swc.ts'
import legacyPlugin from 'vite-plugin-legacy'



export default defineConfig({
  plugins: [
    // legacyPlugin({
    //   "targets": {
    //     'ie': 9
    //   },
    //   additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    //   polyfills: [
    //     'es.object.define-properties',
    //     'es.object.define-property',
    //     'es.object.define-setter',
    //     'es.array.iterator',
    //     'es.promise',
    //     'es.object.assign',
    //     'es.promise.finally'
    //   ]
    // }),
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
    }),
    createVuePlugin({
      // jsx: true,
      // jsxOptions: {
      //   compositionAPI: true,
      // }
    }),
    tsconfigPaths({
      // root: path.resolve(__dirname, './'),
      // projects: ["tsconfig.json"]
    })
  ]
})