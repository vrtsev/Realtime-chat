class ApplicationCable::Connection < ActionCable::Connection::Base 
  identified_by :current_user 
 
  def connect
    self.current_user = find_verified_user 
    logger.add_tags 'ActionCable', current_user.name
  end 
 
  private 
 
  def find_verified_user 
    result = ::Session::Current.(token: request.params[:token])
    return reject_unauthorized_connection unless result[:user].present? 

    result[:user] 
  end 
end 