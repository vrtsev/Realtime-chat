class Api::MessagesController < ApiController
  skip_before_action :authorize

  def index
    chatroom = Chatroom.find(params[:chatroom_id])
    messages = chatroom.messages.all.order(id: :desc).limit(10) if chatroom.present?

    render_ok_json(response: { messages: messages.as_json(include: :user) })
  end

  def create
    chatroom = Chatroom.find(params[:chatroom_id])
    message = current_user.messages.new(message_params)
    message.chatroom_id = chatroom.id

    if message.save
      render_ok_json(response: { message: message.as_json(include: :user) })
    else
      render_error_json(errors: ["Some error"])
    end
  end

  private

  def message_params
    params.require(:message).permit(:content)
  end
end
