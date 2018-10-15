# frozen_string_literal: true

module Api
  class RolesListController < ActionController::API
    def index
      render json: Users::UserRepository.new.get_roles_list(session[:token])
    end
  end
end
