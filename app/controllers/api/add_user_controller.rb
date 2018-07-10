# frozen_string_literal: true

module Api
  class AddUserController < ActionController::API
    def index
      user_params = Users::User.new(allowed_params_to_add).to_h.compact
      add_user = Users::UserRepository.new.add_user(user_params, session[:token])
      render json: add_user
    end
  
    private
  
    def allowed_params_to_add
      params.permit(:email, :first_name, :last_name, :county_name, :user_create_date, :user_last_modified_date, :racfid, :enabled, :status, :format, roles: []).to_h
    end
  end
end
