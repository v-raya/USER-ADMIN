Rails.application.routes.draw do
  root 'dashboard#index'
  get 'user_list', to:'user_details#index'
  # # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'users#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: 'json' } do
    resources :user_list, only: [:index] do
    end
  end
end
