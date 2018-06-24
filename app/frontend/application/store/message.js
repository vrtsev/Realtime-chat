import axios from "axios";

export default {
  namespaced: true,
  state: {
    allMessages: [],
    form: {
      content: '',
    }
  },
  mutations: {
    assignAllMessages(state, payload)  { state.allMessages = payload },
    clearMessages(state, payload)      { state.allMessages = [] },
    addMessage(state, payload)         { state.allMessages.unshift(payload) },
  },
  actions: {
    index(context, chatroom_id)  {
      return axios.get('/api/chatrooms/' + chatroom_id + '/messages')
      .then((response) => {
        context.commit('assignAllMessages', response.data.response.messages)
      })
      .catch((error) => {
        context.commit('clearMessages')
      })
    },
    create(context, chatroom_id) {
      return axios.post('/api/chatrooms/' + chatroom_id + '/messages', { message: context.state.form })
      .then((response) => {
        context.commit('addMessage', response.data.response.message)
      })
      .catch((error) => {
        console.log('Can not create message')
      })
    }
  }
}
