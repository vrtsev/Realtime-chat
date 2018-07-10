import ActionCable from 'actioncable'

let consumer = ActionCable.createConsumer('/cable?token=' + localStorage.auth_token ); 
export default consumer 
