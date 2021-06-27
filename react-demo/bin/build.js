const path = require('path')
const dir = path.resolve(__dirname, '../')
const cwd = path.resolve(dir, '../')
const serverDir = path.resolve(cwd, './public')

require('esbuild').serve({
	port: 8888,
	servedir: serverDir
}, {
  entryPoints: [path.resolve(dir, './app.jsx')],
  bundle: true,
  outfile: path.resolve(serverDir, './reactApps/out.js')
}).catch((e) => {
	console.log(e)
})



