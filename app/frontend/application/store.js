// Plugins
import VuexMount      from 'lib/vuex-bind.js'

// You can access each module in console by typing 'store.state.example'
import moduleSessions from 'application/store/sessions.js'
import moduleMessages from 'application/store/messages.js'

// Serializers
import MessageSerializer from 'application/serializers/message_serializer.js'

export default {
  plugins: [
    VuexMount('chatrooms'),
    VuexMount('messages', MessageSerializer),
    VuexMount('sessions')
  ],
  modules: {
    sessions: moduleSessions,
    // auth:     moduleAuth,
    // user:     moduleUser,
    // chatroom: moduleChatroom,
    // messages:  moduleMessages,
  }
}
