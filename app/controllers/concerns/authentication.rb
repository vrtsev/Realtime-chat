module Authentication
  extend ActiveSupport::Concern

  private

  def authenticate
    @current_user ||= current_session[:user] if current_session.success?
  end

  def authorize
    render json: { error: "Unauthorized. #{current_session[:errors]}" }, status: 401 unless current_user.present?
  end

  def current_user
    @current_user
  end

  def current_session
    Session::Current.(auth_header: request.headers['Authorization'])
  end

  def check_admin_rights
    return render_error_json(errors: ["You haven't access to this page"]) unless current_user.try(:admin)
  end
end