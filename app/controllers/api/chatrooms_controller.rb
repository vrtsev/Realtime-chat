class Api::ChatroomsController < ApiController
  skip_before_action :authorize

  def index
    chatrooms = Chatroom.all
    render_ok_json(response: { chatrooms: chatrooms })
  end

  def show
    chatroom = Chatroom.find(params[:id])

    if chatroom.present?
      render_ok_json(response: { chatroom: chatroom })
    else
      render_error_json(errors: ["Some error"])
    end
  end

  def create
    chatroom = Chatroom.new(chatroom_params)

    if chatroom.save
      render_ok_json(response: { chatroom: chatroom })
    else
      render_error_json(errors: ["Some error"])
    end
  end

  private

  def chatroom_params
    params.require(:chatroom).permit(:name)
  end
end
