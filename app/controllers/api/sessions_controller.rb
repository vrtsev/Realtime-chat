class Api::SessionsController < ApiController
  skip_before_action :authorize, only: :create

  def current
    if current_user.present?
      render json: { user: current_user, token: current_session[:token] }
    else
      render_error_json(errors: ["Not logged in"])
    end
  end

  def create
    user = User.find_by(pincode: params[:session][:pincode])

    if user.present?
      auth_token = Auth.encode token_payload_for(user)
      render json: { user: user, token: auth_token }
    else
      render_error_json(errors: ["Can't find user with this pincode"])
    end
  end

  private

  def token_payload_for(user)
    {
      user:  user.id,
      admin: user.admin,
      iss:   'Realtime Chat',
      exp:   Time.now.to_i + 4 * 3600
    }
  end
end
