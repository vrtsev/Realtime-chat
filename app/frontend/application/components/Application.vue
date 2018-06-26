<template>
  <div class="application container">
    <navbar/>

    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Navbar         from 'application/components/shared/Navbar.vue'
import AuthHelper     from 'application/helpers/auth_helper.js'

export default {
  components: { navbar: Navbar },
  mounted() {
    // Auto authenticate on script initialize
    AuthHelper.restoreToken()
    this.getCurrent()
  },
  methods: mapActions('sessions', ['getCurrent']),
}
</script>

