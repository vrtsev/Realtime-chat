class ChatroomChannel < ApplicationCable::Channel 
  def subscribed
    stream_from "chatroom_#{params[:room_id]}"
    
    # Following methods are available here
    # .current_user
    # .unsubscribe_from_channel
    # .connection
    # .params => {"channel"=>"ChatroomChannel"}
    # .subscribe_to_channel
    # .broadcasting_for
    # .channel_name
    # .stop_all_streams
    # .stream_for
    # .stream_from
  end 

  def receive(data)
    ActionCable.server.broadcast("chatroom_#{params[:room_id]}", data)
  end
end