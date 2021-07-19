/*
* 要求每个store都是一个独立的module，要求都有namespace
* UserInfoModel这个暂时忽略
*/

export default {
  namespace: true,
  state () {
    return {
      account: 0
    }
  },
  mutations: {
    initData (state, account) {
      state.account = account
    }
  }
}
