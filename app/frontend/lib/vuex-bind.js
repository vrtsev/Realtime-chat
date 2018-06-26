import axios from 'axios'

const http = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
})

http.interceptors.request.use(function (config) {
  config.headers['X-CSRF-Token'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  return config
}, function (error) {
  return Promise.reject(error.response)
})

const ALL     = 'ALL'
const GET     = 'GET'
const CREATE  = 'CREATE'
const UPDATE  = 'UPDATE'
const DESTROY = 'DESTROY'
const ERROR   = 'ERROR'

const updateItem = (item, all, remove) => {
  remove = remove || false
  const thisItem = all.find(i => i.id === item.id)
  const thisItemIndex = all.indexOf(thisItem)
  if (thisItemIndex > -1) {
    if (remove) {
      all.splice(thisItemIndex, 1)
    } else {
      all.splice(thisItemIndex, 1, item)
    }
  }
}

const resourcePath = (resource, params) => {
  if (params.id) {
    return `/${resource}/${params.id}.json`
  } else {
    return `/${resource}.json`
  }
}

const serialize = (response, serializer) => {
  if (serializer) {
    return serializer.parse(response)
  } else {
    return response
  }
}

export default function VuexRailsPlugin(resource, serializer) {
  const state = {
    all: [],
    current: {},
    error: null,
  }
  
  const mutations = {
    [ALL] (state, { items }) {
      state.error = null
      state.all = items
    },
    [GET] (state, { item }) {
      state.error = null
      state.current = item
      updateItem(state.current, state.all)
    },
    [CREATE] (state, { item }) {
      state.error = null
      if (state.all.find(i => i.id === item.id) !== undefined) {
        updateItem(item, state.all)
      } else {
        state.all.push(item)
      }
    },
    [UPDATE] (state, { item }) {
      state.error = null
      state.current = null
      updateItem(item, state.all)
    },
    [DESTROY] (state, { item }) {
      state.error = null
      state.current = {}
      updateItem(item, state.all, true)
    },
    [ERROR] (state, { err }) {
      state.error = err.response && err.response.data ? err.response.data : err
    }
  }
  
  const actions = {
    getAll({ commit }, params) {
      params = params || {}
      return new Promise((resolve, reject) => {
        http.get(`/${resource}.json`, { params })
          .then(res => {
            const items = serialize(res.data, serializer)
            commit(ALL, { items })
            resolve(res)
          })
          .catch(err => {
            commit(ERROR, { err })
            reject(err)
          })
      })
    },
    get({ commit }, id, params) {
      params = params || {}
      return new Promise((resolve, reject) => {
        http.get(resourcePath(resource, { id: id }), { params })
          .then(res => {
            const item = serialize(res.data, serializer)
            commit(GET, { item })
            resolve(res)
          })
          .catch(err => {
            commit(ERROR, { err })
            reject(err)
          })
      })
    },
    create({ commit }, item) {
      return new Promise((resolve, reject) => {
        http.post(`/${resource}.json`, item)
          .then(res => {
            const item = serialize(res.data, serializer)
            commit(CREATE, { item })
            resolve(res)
          })
          .catch(err => {
            commit(ERROR, { err })
            reject(err)
          })
      })
    },
    update({ commit }, item) {
      return new Promise((resolve, reject) => {
        http.put(resourcePath(resource, item), item)
          .then(res => {
            const item = serialize(res.data, serializer)
            commit(UPDATE, { item })
            resolve(res)
          })
          .catch(err => {
            commit(ERROR, { err })
            reject(err)
          })
      })
    },
    destroy({ commit }, item) {
      return new Promise((resolve, reject) => {
        http.delete(resourcePath(resource, item))
          .then(res => {
            commit(DESTROY, { item })
            resolve(res)
          })
          .catch(err => {
            commit(ERROR, { err })
            reject(err)
          })
      })
    },
  }

  return store => {
    store.registerModule(resource, {
      namespaced: true,
      state:      state,
      actions:    actions,
      mutations:  mutations
    })
  }
}
