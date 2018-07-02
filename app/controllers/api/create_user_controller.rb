# frozen_string_literal: true

module Api
  class CreateUserController < ActionController::API
    def index
      user_params = Users::User.new(allowed_params_to_create).to_h.compact
      create_user = Users::UserRepository.new.create_user(user_params, session[:token])
      render json: create_user
    end
  
    private
  
    def allowed_params_to_create
      params.permit(:email, :racfid, :format).to_h
    end
  end
end
