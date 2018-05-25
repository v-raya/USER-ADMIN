# frozen_string_literal: true

module Api
    class SearchUserController < ActionController::API
      def show
        search_user = Users::UserRepository.new.search_users(params[:id], session[:token])
        render json: search_user
      end
    end
  end
  