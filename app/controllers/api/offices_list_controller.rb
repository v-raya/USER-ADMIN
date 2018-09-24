# frozen_string_literal: true

module Api
  class OfficesListController < ActionController::API
    def index
      token = session[:token]
      offices = Users::UserRepository.new.get_offices_list(token)
      render json: offices
    end
  end
end
