# frozen_string_literal: true

module Api
  class UserDetailController < ActionController::API
    def show
      user_details = Users::UserRepository.new.get_users_details(params[:id], session[:token])
      render json: user_details
    end
  end
end
