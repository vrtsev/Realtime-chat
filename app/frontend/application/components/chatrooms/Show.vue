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

    <div v-for="message in message.allMessages" :key="message.content" class="alert" :class="isCurrentUser(message.user.name) ? 'alert-primary my-message' : 'alert-warning'" role="alert">
      <b>{{ message.user.name }}:</b> {{ message.content }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['chatroom', 'message']),
  mounted() {
    store.dispatch('chatroom/show', router.currentRoute.params.id)
    store.dispatch('message/index', router.currentRoute.params.id)
  },
  methods: {
    sendMessage() {
      store.dispatch('message/create', router.currentRoute.params.id)
    },
    isCurrentUser(name) {
      return store.state.user.data.name == name
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

</style>
