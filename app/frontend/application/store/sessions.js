import axios      from "axios";
import AuthHelper from 'application/helpers/auth_helper.js';

export default {
  namespaced: true,
  actions: {
    getCurrent: function({ commit }) {
      return new Promise((resolve, reject) => {
        AuthHelper.restoreToken()

        axios.get('/sessions/current')
        .then(res => {
          const item = res.data //representWith(config.representer, res.data)
          commit('GET', { item })
          resolve(res)
        })
        .catch(err => {
          commit('ERROR', { err })
          reject(err)
        })
      })
    },
  }
}
