class Session::Current < Trailblazer::Operation
  include OperationHelper

  PAYLOAD_USER_KEY = 'user'

  step :get_header_token
  step :decode_token
  step :check_token_payload
  step :find_user

  def get_header_token(options, params:, **)
    return error(options, 'Authorization header not found') unless params[:token].present?
    options[:token] = params[:token]
  end

  def decode_token(options, params:, **)
    options[:payload] = Auth.decode(params[:token])
    return options[:payload] unless options[:payload].nil?

    error(options, 'Empty token payload (Check token exp. date)')
  rescue
    error(options, 'Invalid auth token')
  end

  def check_token_payload(options, params:, **)
    return true if options[:payload].key?(PAYLOAD_USER_KEY)

    error(options, 'Invalid payload in auth token')
  end

  def find_user(options, params:, **)
    options[:user] = User.find(options[:payload][PAYLOAD_USER_KEY])
  rescue
    error(options, 'Invalid user id')
  end
end

# Available data after operation:

# options[:token]
# options[:payload]
# options[:user]
# options[:errors]