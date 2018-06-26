<template>
  <div>
    <h1>All chatrooms</h1>

    <div class="row">
      <div v-for="chatroom in allChatrooms" :key="chatroom.name" class="col-md">
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">{{ chatroom.name }}</h5>
            <router-link :to="'/chatrooms/' + chatroom.id" class="btn btn-primary">Enter</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState }   from 'vuex'
import { mapActions } from 'vuex'

export default {
  mounted() { this.getAllChatrooms() },
  computed: mapState('chatrooms', {
    allChatrooms: state => state.all,
    chatroom:     state => state.current,
    error:        state => state.error
  }),
  methods: mapActions('chatrooms', { 
    getAllChatrooms: 'getAll'
  })
}
</script>
