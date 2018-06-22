// You can access each module in console by typing 'store.state.example'
import moduleUser     from 'application/store/user.js'
import moduleAuth     from 'application/store/auth.js'
import moduleChatroom from 'application/store/chatroom.js'
import moduleMessage  from 'application/store/message.js'

const store = {
  modules: {
    auth:     moduleAuth,
    user:     moduleUser,
    chatroom: moduleChatroom,
    message:  moduleMessage,
  }
}

export default store
