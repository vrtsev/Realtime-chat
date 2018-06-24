import ActionCable from 'actioncable'

let consumer = ActionCable.createConsumer('/cable?token=' + localStorage.user_token ); 
export default consumer 
