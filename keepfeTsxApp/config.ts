import FeConfig from '@keepfe/plugin-configjs'

const keepConfig = new FeConfig('', false, false)
const appconfig = {
  ...keepConfig,
  api: keepConfig.cmsProxy.host,
  qiniuUrl: keepConfig.cmsProxy.host
}

const iviewAdminConfig = { // config.js 的配置内容
  login: { // 登录配置，类型和过期时间，expire只在ldap类型下有效
    type: 'ldap', // ldap, keep
    ldapExpires: '30d'
  },
  appName: 'banana', // 应用的名称，建议用bananaName
  homeName: 'home', // 首页路由名称
  ldapAuth: { // auth中心配置信息
    hideWithAuth: true // 无权限路由是否隐藏，uiInfo为iview-admin有效
  }
}

Object.assign(appconfig, iviewAdminConfig)

export default appconfig
