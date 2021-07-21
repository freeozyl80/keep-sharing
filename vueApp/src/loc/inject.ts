import 'reflect-metadata'
import { Type, INJECTED } from './interface'

export function Injectable() {
  return function(target: any) {
    // 记录前置依赖
    const outInjected = Reflect.getMetadata('design:paramtypes', target) as (Type<any> | undefined)[]
    console.log(outInjected, '。。。')
    const innerInjected = target[INJECTED]
    if(!innerInjected) {
      target[INJECTED] = outInjected
    } else {
      outInjected.forEach((argType, index) => {
        if(!innerInjected[index]) {
          target[INJECTED][index] = argType
        }
      })
    }
    return target
  }
}