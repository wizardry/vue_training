import { STORAGE_KEY } from './mutations'
import createLogger from '../common/plugins/logger'

const localStoragePlugin = store => {
  store.subscribe((mutation, { items }) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  })
}

export default process.env.NODE_ENV !== 'production'
  ? [createLogger(), localStoragePlugin]
  : [localStoragePlugin]
