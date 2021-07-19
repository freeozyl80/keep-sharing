
let UiLayoutRouters = []



import routerList from '_app/routers/_list.ts'



import initFns from '_app/kfe-entries/entry.ts'
let outObj = {
  beforeEach: initFns.beforeEach,
  beforeResolve: initFns.beforeResolve,
  afterEach: initFns.afterEach
}


let routers = []
let existName = {}
for (let i in routerList) {
  let item = routerList[i]
  existName[item.name] = 1
  routers.push(item)
}

// 覆盖默认路由逻辑
for (let i in UiLayoutRouters) {
  let item = UiLayoutRouters[i]
  if (!existName[item.name]) {
    routers.push(item)
  }
}

outObj.routers = routers
outObj.base = '/banana-name/'
export default outObj
