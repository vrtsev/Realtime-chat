<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Realtime Chat</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
      </ul>
    </div>

    <div class="inline">
      <a v-if="session.user" @click="destroySession" class="btn btn-outline-success">Logged as {{ session.user.name }}</a>
      <router-link v-else to="/users/login"   class="btn btn-outline-success">Login</router-link> 
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import AuthHelper   from 'application/helpers/auth_helper.js'

export default {
  computed: mapState('sessions', {
    session: state => state.current,
  }),
  methods: {
    destroySession() {
      router.replace('/')
      store.commit('sessions/DESTROY', this.session)
      AuthHelper.clearToken()
    }
  }
}
</script>
