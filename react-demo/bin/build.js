const path = require('path')
const dir = path.resolve(__dirname, '../')

require('esbuild').build({
  entryPoints: [path.resolve(dir, './app.jsx')],
  bundle: true,
  outfile: path.resolve(dir, './dist/out.js'),
}).catch(() => process.exit(1))