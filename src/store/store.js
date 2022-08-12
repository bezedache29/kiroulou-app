import { createStore } from 'easy-peasy'

import userStore from './user/index'

const globalModel = {
  user: userStore,
}

const GlobalStore = createStore(globalModel)
export default GlobalStore
