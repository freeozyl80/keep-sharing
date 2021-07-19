let bananaName = 'banana-name'

module.exports = {
  bananaName, // 项目的banana名
  openCSP: true, // 是否开启CSP
  ABTest: false, // 是否开启 AB 测试
  'app1': {
    bananaName,  // 应用属于哪个banana
    baseUrl: `/${bananaName}/`, // 路由的base路径
    appType: 'spa', // spa, ssr
    title: '乌拉诺斯', // html文档的标题
    entryFile: 'entry.ts', // 应用入口扩展文件
    webpackFile: 'pack.js', // webpack的扩展配置文件
    routers: '_list.ts', // 路由列表文件名
    stores: '_list.ts', // 状态模块列表文件名
    // prerouters: ['', 'demo1/', 'demo2/'], // 需要执行预渲染的路径, ''代表/
    devConfig: { // 本地开发环境配置
      host: 'local.dev.gotokeep.com', // dev模式的域名
      port: 8888, // dev模式的端口
    },
    typescript: {
      include: ['**/*.ts', '**/*.tsx', '**/*.d.ts', '**/*.vue'],
      paths: {
         "_app/*": ["./*"]
      }
    }
  }
}
