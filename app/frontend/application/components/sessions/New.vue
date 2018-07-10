<template>
  <div class="users login">
    <h2>Login</h2>

    <form @submit.prevent="submitForm" class="new-session">
      <div class="form-group">
        <input v-model="newSession.pincode" type="password" class="form-control" placeholder="Enter your pincode">
      </div>

      <button class="btn btn-primary" type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios          from 'axios'
import { mapState }   from 'vuex'
import { mapActions } from 'vuex'
import AuthHelper     from 'application/helpers/auth_helper.js'

export default {
  data() {
    return {
      newSession: {
        pincode: '',
      }
    }
  },
  computed: mapState('sessions', {
    session: state => state.current,
    error:   state => state.error
  }),
  methods: {
    ...mapActions('sessions', {
      getSession:    'getCurrent',
      createSession: 'create'
    }),

    submitForm() {
      this.createSession(this.newSession)
      .then(createdSession => {
        AuthHelper.saveToken(createdSession.data.token)
        this.getSession()
        router.replace('/')
      })
      .catch(err => {
        AuthHelper.clearToken()
      })
      
    }
  }
}
</script>

