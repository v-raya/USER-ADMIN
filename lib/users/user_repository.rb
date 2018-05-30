# frozen_string_literal: true

module Users
  class UserRepository
    def initialize(http_service = Infrastructure::HttpService.new)
      @http_service = http_service
    end

    def get_users(last_name, token)
      response = @http_service.get("/perry/idm/users", last_name, token)
      return [] if response.status == 404
      response.body.map { |result| User.new(result) }
    end

    def get_users_details(id, last_name ='', token)
      response = @http_service.get("/perry/idm/users/#{id}", last_name, token)
      return {} if response.status == 404
      User.new(response.body)
    end
  end
end
