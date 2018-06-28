# frozen_string_literal: true

module Api
  class UserListController < ActionController::API
    def index
      params = Users::User.new(allowed_params_to_search).to_h.compact
      users = Users::UserRepository.new.get_users(params, session[:token])
      render json: users
    end

    private

    def allowed_params_to_search
      params.permit(:last_name, :format).to_h
    end
  end
end
