Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  root 'application#index'

  namespace :api do
    resources :sessions, only: :create do
      get :current, on: :collection
    end
  end

  get "*path", to: "application#index", format: false
end
