# frozen_string_literal: true

module Api
  class UserDetailController < ActionController::API
    def show
      user_details = Users::UserRepository.new.get_users_details(params[:id], session[:token])
      render json: user_details
    end

    def save_user
      updated_user = Users::UserRepository.new.update_user(params[:id], params[:enabled], params[:permissions], session[:token])
      render json: updated_user
    end
  end
end
