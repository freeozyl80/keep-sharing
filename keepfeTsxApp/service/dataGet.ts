import axios from '@vuecore/libs/request'

export const getData = () => {
  return axios.request({
    url: 'https://ark.pre.gotokeep.com/api/admin/app/getall',
    method: 'get'
  })
}
