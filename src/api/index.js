import { MOCK } from './config'

if (MOCK) {
  let data = import('./mock/position.json')
  return data
}
