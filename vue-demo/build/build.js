const path = require('path')
const build = require('esbuild')
const esbuildDecorators = require('@anatine/esbuild-decorators').esbuildDecorators

build.build({
  entryPoints: [path.resolve(__dirname, '../main.ts')],
  bundle: true,
  outfile: path.resolve(__dirname, '../dist/out.js'),
  plugins: [
    esbuildDecorators({
      tsconfig: path.resolve(__dirname, '../tsconfig.json'),
      cwd: path.resolve(__dirname, '../'),
    })
  ]
})