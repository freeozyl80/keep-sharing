import Core from '@vuecore/index.js'
import vrouter from './router.js'

import initFns from '_app/kfe-entries/entry.ts'



import vstore from './store.js'
// import KpVuex from '@keepfe/kpvuex'
import { callComponentsHookWith } from '@vuecore/router-hook'

__webpack_nonce__ = ''

let mount = function (app, router, store) {
  
  app.$mount('#app')
  
}

let options = {}

options.init = initFns.initFn

options.initOptions = initFns.initOptions


options.vrouter = vrouter
if(typeof vstore !== 'undefined') {
  options.vstore = {
    modules: vstore
  }
}

// instance 注册
// let tempInitFun = options.init
// options.init = function(Vue, store) {
//   if(options.vstore.modules && Object.keys(options.vstore.modules).length > 0) {
//     let instances= {}
//     Object.keys(options.vstore.modules).forEach((moduleName) => {
//       let mod = options.vstore.modules[moduleName]
//       instances[moduleName] = KpVuex.register.registerModel(mod, moduleName, store)
//     })
//     Vue.use(KpVuex, {
//       modules: instances,
//       store: store
//     })
//   }
//   tempInitFun(Vue, store)
// }

Core.createApp(options).then((obj) => {
  let { app, router, store } = obj
  // window._Router = router
  // window._Store = store

  mount(app, router, store)
}, (err) => {
  console.log(err)
})
