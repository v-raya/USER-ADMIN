require 'pry'

Rails.application.routes.draw do
  root 'dashboard#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: 'json' } do
    resources :user_list, only: [:index] do
    end
    get 'verify_user', to: 'verify_user#index'

    resources :user_detail, only: [:show] do
      member do
        patch :save_user
      end
    end

    get 'account', to: 'account#index'
    get 'permissions_list', to: 'permissions_list#index'
    post 'add_user', to: 'add_user#index'
  end

  # Single Page App home
  get '*path', to: 'dashboard#index', constraints: ->(request) do
    !request.xhr? && request.format.html?
    # binding.pry
  end
end
