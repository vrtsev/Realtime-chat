<template>
  <div class="users login">
    <h2>Login</h2>

    <form>
      <div class="form-group">
        <label>Pincode</label>
        <input v-model="auth.form.pincode" type="password" class="form-control" placeholder="Password">
      </div>
      
      <a @click="login" class="btn btn-primary">Log in</a>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState(['auth']),
  methods: {
    login() {
      store.dispatch('auth/login')
      router.push('/')
    }
  }
}
</script>

