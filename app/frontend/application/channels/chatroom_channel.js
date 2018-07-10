import WebSocket from 'application/websocket.js' 
 
export default function ChatroomChannel(chatroom_id) {
  return WebSocket.subscriptions.create( 
    { channel: 'ChatroomChannel', room_id: chatroom_id }, // pass params to #subscribed 
    { 
      connected(arg) {
        
        // 'this' will return:
        // connected:    ƒ connected()
        // consumer:     Consumer {url: "ws://localhost:3000/cable?token=eyJhbGciOiJIUzI1Ni…5MjN9.nQ9TscP2CMsMuVLAWD9z58E6qZ3DOZNWQhDNSIauQdg", subscriptions: Subscriptions, connection: Connection}
        // disconnected: ƒ disconnected()
        // identifier:   { channel: "ChatroomChannel", room_id: "1"}
        // notification: ƒ notification(text)
        // received:     ƒ received(data)
        // rejected:     ƒ rejected(data)

        this.notification('has connected to channel')
      }, 
      disconnected(arg) { console.log('You have been disconnected') }, 
      received(data)    { store.commit('messages/CREATE', { item: data }) }, 
      rejected(data)    { console.log('rejected') },

      // 'private'

      notification(text) {
        let notification = {
          id: Math.floor(Math.random() * 5000) + 900,
          type:    'notification',
          content: text,
          user: { name: store.state.sessions.current.user.name }
        }

        this.send(notification)
      }

      // Cheatsheet
      // this.send(data) // Allows you to send message to server
      // this.perform(method_name, { data }) // Call additional method on server side 
    } 
  ); 
}

