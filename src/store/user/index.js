import { action } from 'easy-peasy'

const userStore = {
  user: {},

  loadUser: action((state, payload) => {
    state.user = payload
  }),
}

export default userStore
