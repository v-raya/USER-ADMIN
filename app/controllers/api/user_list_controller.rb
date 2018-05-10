# frozen_string_literal: true

module Api
    class UserListController < ActionController::API
      def index
        users = Users::UserRepository.new.get_users(session[:token])
        render json: users
      end
    end
end 