<template>
  <div>
    <h1>Chatroom: {{ chatroom.name }} </h1>
    <br>

    <div v-if="messagesError" class="alert alert-danger" role="alert">
      <h4 class="alert-heading">Something went wrong!</h4>

      <p v-for="(error, index) in messagesError" :key="index">
        {{ error }}
      </p>
    </div>

    <form @submit.prevent="createMessage(newMessage)" class="new-message">
      <div class="form-group">
        <input v-model="newMessage.content" type="text" class="form-control" placeholder="Enter your message">
      </div>

      <button class="btn btn-primary" type="submit">Send</button>
    </form>

    <h2>Messages: </h2>
    <br>

    <div v-for="message in allMessages" :key="message.id" class="alert" :class="defineMessageClass(message.type, message.user.name)" role="alert">
      <b>{{ message.user.name }}:</b> {{ message.content }}
    </div>
  </div>
</template>

<script>
import { mapState }    from 'vuex'
import { mapActions }  from 'vuex'
import ChatroomChannel from 'application/channels/chatroom_channel.js'

export default {
  mounted() {
    this.getChatroom(router.currentRoute.params.id)
    this.getAllMessages({ chatroom_id: router.currentRoute.params.id })
    ChatroomChannel(router.currentRoute.params.id)
  },
  data() {
    return {
      newMessage: {
        content: '',
        chatroom_id: router.currentRoute.params.id
      }
    }
  },
  computed: {
    ...mapState('chatrooms', {
      chatroom:       state => state.current,
      chatroomsError: state => state.error
    }),
    ...mapState('messages', {
      allMessages:    state => state.all,
      messagesError:  state => state.error
    })
  },
  methods: {
    ...mapActions('chatrooms', { getChatroom: 'get' }),
    ...mapActions('messages',  {
      getAllMessages: 'getAll',
      createMessage:  'create',
    }),

    defineMessageClass(type, name) {
      if (type == 'notification') return "notification"

      return store.state.sessions.current.user.name == name ? 'alert-primary my-message' : 'alert-warning'
    }
  }
}
</script>

<style lang="scss">
  .alert.my-message {
    margin-left: 150px;
  }

  .alert:not(.my-message) {
    margin-right: 150px;
  }

  .alert.notification {
    margin: 0 150px;
    text-align: center;
  }

</style>
