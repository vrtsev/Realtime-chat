class ApplicationController < ActionController::Base
  def index
    # Layout can be found in app/frontend/layouts
    render template: "layouts/application"
  end
end
