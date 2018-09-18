# frozen_string_literal: true

module Api
  class AddUserController < ActionController::API
    def index
      user_params = Users::User.new(allowed_params_to_add).to_h.compact
      add_user = Users::UserRepository.new.add_user(user_params, session[:token])
      render json: add_user
    rescue ApiError => e
      render json: e.response, status: e.status
    end

    private

    def allowed_params_to_add
      params.permit(:email,
                    :first_name,
                    :last_name,
                    :office,
                    :county_name,
                    :user_create_date,
                    :user_last_modified_date,
                    :racfid, :enabled,
                    roles: []).to_h
    end
  end
end
