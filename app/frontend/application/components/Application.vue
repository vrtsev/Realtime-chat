<template>
  <div class="application container">
    <navbar/>

    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from 'application/components/shared/Navbar.vue'
import axios from 'axios'

export default {
  components: { navbar: Navbar },
  mounted() {
    store.dispatch('auth/getCurrent')
  }
}
</script>

