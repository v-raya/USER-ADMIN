# frozen_string_literal: true

module Api
  class UserListController < ActionController::API
    def index
      users = Users::UserRepository.new.get_users(session[:token])
      render json: users
    end

    def search_users
      users = Users::UserRepository.new.search_users(params[:id], session[:token])
      render json: users
    end
  end
end
