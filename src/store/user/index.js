import { action } from 'easy-peasy'

const userStore = {
  user: {},
  authToken: {},

  loadUser: action((state, payload) => {
    state.user = payload
  }),
  loadAuthToken: action((state, payload) => {
    state.authToken = payload
  }),
}

export default userStore
