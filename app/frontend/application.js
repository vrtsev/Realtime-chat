/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//

// DEVELOPMENT USAGE INFORMATION
// To reference this file, add
// <%= stylesheet_pack_tag 'application' %>
// <%= javascript_pack_tag 'application' %>
// to the appropriate layout file, like app/views/layouts/application.html.erb

// Import dependencies and components here
import Vue                 from 'vue/dist/vue.js'
import Vuex                from 'vuex'
import VueRouter           from 'vue-router'
import routes              from 'application/routes'
import Store               from 'application/store'
import axios               from "axios";
import ActionCable         from 'actioncable';

// Mixins
// import FormMixin           from 'application/mixins/form_mixin.js'

// Our components
import Application         from 'application/components/Application.vue'

// Change settings here
Vue.config.productionTip = false
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['X-CSRF-Token']     = document.querySelector('[name="csrf-token"]').content;
axios.defaults.headers.common['Accept']           = 'application/json'

// Initialize Vue instance here
document.addEventListener('DOMContentLoaded', () => {
  // Establish WebSocket connection
  const cable = ActionCable.createConsumer(`/cable?token=${localStorage.user_token}`);
  window.cable = cable

  // Define global mixins here
  // Vue.mixin(FormMixin)

  // Define third-party components here (don't forget to import constant)
  Vue.use(Vuex);
  Vue.use(VueRouter);

  // Define your own components here
  Vue.component('application',  Application);

  // Define Vue-router
  const router  = new VueRouter({ mode: 'history', routes })
  window.router = router

  // use separate Vue instance as a global events bus
  const eventBus  = new Vue();
  window.eventBus = eventBus

  // Define global Vuex store
  const store  = new Vuex.Store(Store)
  window.store = store

  // Define global Vue-instance
  const app  = new Vue({
    el: '#app',
    router,
    store,
  });
  window.app = app
})
