const path = require('path')
const dir = path.resolve(__dirname, '../')
const cwd = path.resolve(dir, '../')
const serverDir = path.resolve(cwd, './public')

require('esbuild').serve({
  port: 8888,
  servedir: serverDir
}, {
  entryPoints: [path.resolve(dir, './main.ts')],
  bundle: true,
  outfile: path.resolve(serverDir, './vueApps/app.js')
}).catch((e) => {
  console.log(e)
})



