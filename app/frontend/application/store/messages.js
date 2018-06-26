// import JSONAPISerializer from 'jsonapi-serializer'
// import axios from "axios";

// var MessageSerializer = new JSONAPISerializer.Serializer('message', {
//   pluralizeType: false,
//   attributes: ['content', 'user'],
//   meta: {},
//   user: {
//     ref: 'id',
//     included: false,
//     attributes: ['name']
//   }
// });

// export default {
//   namespaced: true,
//   actions: {
//     getAll({ commit }, params) {
//       params = params || {}
//       return new Promise((resolve, reject) => {
//         axios.get(`/messages`, { params })
//           .then(res => {
//             debugger
//             const items = MessageSerializer.serialize(res.data);
//             commit('ALL', items.data )
//             resolve(res)
//           })
//           .catch(err => {
//             commit('ERROR', { err })
//             reject(err)
//           })
//       })
//     },
//   }
// }
