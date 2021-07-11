import path from 'path'
import { esbuildDecorators } from '@anatine/esbuild-decorators'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import {createVuePlugin} from 'vite-plugin-vue2'
import babel from "@rollup/plugin-babel"

export default defineConfig({
  esbuild: {
    // plugins: [
    //   esbuildDecorators({
    //     tsconfig: path.resolve(__dirname, './tsconfig'),
    //     cwd: path.resolve(__dirname),
    //     tsx: true
    //   })
    // ],
  },
  plugins: [
    // tsconfigPaths({
    //   root: path.resolve(__dirname, './'),
    //   projects: ["tsconfig.json"]
    // }),
    // babel({
    //   include: [ './src/**'],
    //   babelHelpers: 'bundled'
    // }),
    // createVuePlugin({
    //   jsx: true,
    //   jsxOptions: {
    //     compositionAPI: true,
    //   }
    // })
  ]
})