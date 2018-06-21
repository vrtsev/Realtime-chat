class ApplicationController < ActionController::Base
  include Authentication
  include JSONResponders

  def index
    render template: "layouts/application"
  end

  private

  # Helper for trailblazer operations
  def get_errors_from(operation)
    operation['contract.default'].errors.full_messages
  end
end
