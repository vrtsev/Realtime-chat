// You can access each module in console by typing 'store.state.example'
import moduleUser from 'application/store/user.js'
import moduleAuth from 'application/store/auth.js'

const store = {
  modules: {
    auth: moduleAuth,
    user: moduleUser,
  }
}

export default store
