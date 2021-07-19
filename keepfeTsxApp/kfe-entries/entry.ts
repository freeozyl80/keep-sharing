import 'vue-tsx-support'
import VueCompositionAPI from '@vue/composition-api'

const initFn = (Vue) => {
  Vue.use(VueCompositionAPI)
  console.log('initfN ------ ')
}
const beforeEach = function (to, from, next) {
  console.log('-->router: beforeEach')
  next()
}
const beforeResolve = function (to, from, next) {
  console.log('-->router: beforeResolve')
  next()
}
const afterEach = function (to, from) {
  console.log('-->router: afterEach')
}

const beforeRegister = function() {
  console.log('--->store: beforeRegister')
}

const afterRegister = function() {
  console.log('--->store: afterRegister')
}

export default {
  initFn,
  beforeEach,
  beforeResolve,
  afterEach,
  beforeRegister,
  afterRegister
}
