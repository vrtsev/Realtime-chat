class Session::Current < Trailblazer::Operation
  include OperationHelper

  PAYLOAD_USER_KEY = 'user'
  TOKEN_PATTERN    = /Bearer (.*)$/

  step :get_header_token
  step :decode_token
  step :check_token_payload
  step :find_user

  def get_header_token(options, params:, **)
    if params[:auth_header].present?
      options[:token] = params[:auth_header].scan(TOKEN_PATTERN).flatten.last
    elsif params[:token].present?
      options[:token] = params[:token]
    else
      error(options, 'Authorization header not found')
    end
  end

  def decode_token(options, params:, **)
    options[:payload] = Auth.decode(options[:token])
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