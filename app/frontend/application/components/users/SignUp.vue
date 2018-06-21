<template>
  <div class="users signup">
    <h2>SignUp</h2>

    <form>
      <div class="form-group">
        <label>Email address</label>
        <input v-model="form.email" type="email" class="form-control" placeholder="Enter email">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input v-model="form.password" type="password" class="form-control" placeholder="Password">
      </div>
      
      <a @click="login" class="btn btn-primary">Log in</a>
    </form>
  </div>
</template>

<script>
export default {
  data: ()=> {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      store.dispatch('auth/signUp', this.form)
    }
  }
}
</script>

