Rails.application.routes.draw do
  root 'users_list#index'
  get 'users_list/index'
  get 'user_details/index'
  # # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
