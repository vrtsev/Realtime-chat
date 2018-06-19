Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  root 'application#index'

  namespace :api do
  end
end
