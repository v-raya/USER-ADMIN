# frozen_string_literal: true

module Api
  class PermissionsListController < ActionController::API
    def index
      token = session[:token]
      permissions = Users::UserRepository.new.get_permissions_list(token)
      render json: permissions
    end
  end
end
