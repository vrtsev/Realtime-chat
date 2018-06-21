import axios from "axios";

export default {
  namespaced: true,
  state: {
    data: {
      name: '',
      admin: false,
      pincode: ''
    }
  },
  mutations: {
    assignUserData(state, payload) { state.data = payload },
    clearUserData(state)           { state.data = {} },
  },
}
