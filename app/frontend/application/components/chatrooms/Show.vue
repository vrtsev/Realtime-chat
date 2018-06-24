<template>
  <div>
    <h1>Chatroom: {{ chatroom.data.name }} </h1>
    <br>

    <form class="new-message">
      <div class="form-group">
        <input v-model="message.form.content" type="text" class="form-control" placeholder="Enter your message">
      </div>
      <a @click="sendMessage" class="btn btn-primary">Send</a>
    </form>

    <br>
    <h2>Messages: </h2>
    <br>

    <div v-for="(message, index) in message.allMessages" :key="index" class="alert" :class="defineMessageClass(message.type, message.user.name)" role="alert">
      <b>{{ message.user.name }}:</b> {{ message.content }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ChatroomChannel from 'application/channels/chatroom_channel.js'

export default {
  computed: mapState(['chatroom', 'message']),
  mounted() {
    store.dispatch('chatroom/show', router.currentRoute.params.id)
    store.dispatch('message/index', router.currentRoute.params.id)
    ChatroomChannel(router.currentRoute.params.id)
  },
  methods: {
    sendMessage() {
      store.dispatch('message/create', router.currentRoute.params.id)
    },
    defineMessageClass(type, name) {
      if (type == 'notification') return "notification"

      return store.state.user.data.name == name ? 'alert-primary my-message' : 'alert-warning'
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
