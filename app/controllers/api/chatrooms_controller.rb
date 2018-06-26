class Api::ChatroomsController < ApiController
  skip_before_action :authorize

  def index
    chatrooms = Chatroom.all
    render json: chatrooms
  end

  def show
    chatroom = Chatroom.find(params[:id])

    if chatroom.present?
      render json: chatroom
    else
      render_error_json(errors: ["Some error"])
    end
  end
end
