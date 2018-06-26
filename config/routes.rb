Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  root 'application#index'

  namespace :api, defaults: { format: :json } do
    resources :sessions, only: :create do
      get :current, on: :collection
    end

    resources :chatrooms, only: [:index, :show, :create] #do
    # end
    resources :messages, only: [:index, :create]
  end

  get "*path", to: "application#index", format: false
end
