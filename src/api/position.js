import axios from 'axios'

import { MOCK } from './config'

export function getPositionList (pageNo = 1, pageSize = 10) {
  const url = `http://www.adebibi.com/lagou/listmore.json?pageNo=${pageNo}&pageSize=${pageSize}`

  return axios.get(url).then(res => {
    return Promise.resolve(res.data)
  })
}

export function getSearchList (city = '北京', positionName = '前端', pageNo = 1, pageSize = 10) {
  const url = `http://www.adebibi.com/lagou/search.json?city=${city}&positionName=${positionName}&pageNo=${pageNo}&pageSize=${pageSize}`

  if (MOCK) {
    let data = import('./mock/position.json')
    return data
  }

  return axios.get(url).then(res => {
    return Promise.resolve(res.data)
  })
}

export function getDetailById (id) {
  const url = `http://www.adebibi.com/lagou/detail/${id}`

  return axios.get(url).then(res => {
    return Promise.resolve(res.data)
  })
}

export function getTestData () {
  const url = `http://devwx.tupu360.com/positionData/listInfo`

  if (MOCK) {
    let data = import('./mock/position.json')
    return data
  }

  return axios.get(url).then(res => {
    return Promise.resolve(res.data)
  })
}
