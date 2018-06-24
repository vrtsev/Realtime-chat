import axios from "axios";

const authToken = {
  restore() {
    let token = localStorage.user_token
    if (token) axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  },
  save(token) {
    localStorage.user_token = token
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  },
  delete() {
    delete localStorage.user_token
    axios.defaults.headers.common['Authorization'] = ''
  }
}

export default {
  namespaced: true,
  state: {
    authenticated: false,
    token: '',
    form: {
      pincode: '',
    }
  },
  mutations: {
    authorize(state, token) {
      state.authenticated = true
      state.token         = token
    },
    deauthorize(state) {
      state.authenticated = false
      state.token         = null
    }
  },
  actions: {
    login(context, payload)  {
      return axios.post('/api/sessions', { session: context.state.form })
      .then((response) => {
        context.commit('authorize',           response.data.response.token)
        context.commit('user/assignUserData', response.data.response.user, { root: true })
        authToken.save(response.data.response.token)
      })
      .catch((error) => {
        context.commit('deauthorize')
        context.commit('user/clearUserData', null, { root: true })
      })
    },
    logout(context, payload) {
      context.commit('deauthorize')
      authToken.delete();
    },
    getCurrent(context, payload) {
      authToken.restore()
      return axios.get('/api/sessions/current', { session: context.state.form })
      .then((response) => {
        context.commit('authorize',           response.data.response.user_token)
        context.commit('user/assignUserData', response.data.response.user, { root: true })
        authToken.save(response.data.response.token)
      })
      .catch((error) => {
        context.commit('deauthorize')
        context.commit('user/clearUserData', null, { root: true })
      })
    }
  }
}
