// DEVELOPMENT INFO
// Use '/path/:id' for dynamic segments
// dynamic segments == $route.params

// Named route:
// path: '/user/:userId',
// <router-link :to="{ name: 'user', params: { userId: 123 }}">Пользователь</router-link>
// router.push({ name: 'user', params: { userId: 123 }})

// =============================================================
// APPLICATION ROUTES
// =============================================================
// Main component

import UsersLogin  from 'application/components/users/Login.vue'
import UsersSignUp from 'application/components/users/SignUp.vue'
import ChatroomsIndex from 'application/components/chatrooms/Index.vue'
import ChatroomsShow from 'application/components/chatrooms/Show.vue'

export default [
  { name: 'root',            path: '/',              redirect: '/chatrooms' },
  { name: 'users_login',     path: '/users/login',   component: UsersLogin },
  { name: 'users_sign_up',   path: '/users/sign_up', component: UsersSignUp },
  { name: 'chatrooms_index', path: '/chatrooms',     component: ChatroomsIndex },
  { name: 'chatrooms_show',  path: '/chatrooms/:id', component: ChatroomsShow },
]

// Development info
// 'this.$route' - to get access to current route

