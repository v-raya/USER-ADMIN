# frozen_string_literal: true

module Api
  class RolesListController < ActionController::API
    def index
      token = session[:token]
      roles = Users::UserRepository.new.get_roles_list(token)
      render json: roles
    end
  end
end
