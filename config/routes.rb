Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  root 'application#index'

  namespace :api do
  end

  get "*path", to: "application#index", format: false
end
