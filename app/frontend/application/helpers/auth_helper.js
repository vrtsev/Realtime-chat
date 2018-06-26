import axios from 'axios'

export default {
  restoreToken: () => {
    let token = localStorage.auth_token
    if (token) axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  },
  saveToken: (token) => {
    localStorage.auth_token = token
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  },
  clearToken: () => {
    delete localStorage.auth_token
    axios.defaults.headers.common['Authorization'] = ''
  }
}
