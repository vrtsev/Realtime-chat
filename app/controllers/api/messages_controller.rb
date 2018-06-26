class Api::MessagesController < ApiController
  skip_before_action :authorize

  def index
    chatroom = Chatroom.find(params[:chatroom_id])
    messages = chatroom.messages.all.order(id: :desc).limit(10) if chatroom.present?

    render json: messages.as_json(include: :user)
  end

  def create
    chatroom = Chatroom.find(params[:chatroom_id])
    message = current_user.messages.new(message_params)
    message.chatroom_id = chatroom.id

    if message.save
      ActionCable.server.broadcast("chatroom_#{params[:chatroom_id]}", message.as_json(include: :user))
      render json: message.as_json(include: :user)
    else
      render json: message.errors.full_messages, status: 422
    end
  end

  private

  def message_params
    params.require(:message).permit(:content)
  end
end
