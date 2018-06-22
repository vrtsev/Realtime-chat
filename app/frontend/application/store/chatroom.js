import axios from "axios";

export default {
  namespaced: true,
  state: {
    allChatrooms: [],
    data: {
      id: 0,
      name: '',
    },
    form: {
      name: ''
    }
  },
  mutations: {
    assignAllChatrooms(state, payload) { state.allChatrooms = payload },
    assignChatroomData(state, payload) { state.data = payload },
    clearChatroomData(state)           { state.data = {} },
  },
  actions: {
    index(context, payload)  {
      return axios.get('/api/chatrooms')
      .then((response) => {
        context.commit('assignAllChatrooms', response.data.response.chatrooms)
      })
      .catch((error) => {
        context.commit('clearChatroomData')
      })
    },
    show(context, payload)  {
      return axios.get('/api/chatrooms/' + payload)
      .then((response) => {
        context.commit('assignChatroomData', response.data.response.chatroom)
      })
      .catch((error) => {
        context.commit('clearChatroomData')
      })
    },
    create(context, payload) {
      return axios.post('/api/chatrooms', { chatroom: context.state.form })
      .then((response) => {
        context.commit('assignChatroomData', response.data.response.chatroom)
      })
      .catch((error) => {
        console.log('Can not create chatroom')
      })
    }
  }
}
