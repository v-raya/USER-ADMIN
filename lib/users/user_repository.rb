# frozen_string_literal: true

module Users
  class UserRepository
    def initialize(http_service = Infrastructure::HttpService.new)
      @http_service = http_service
    end

    def get_users(last_name, token)
      response = @http_service.get('/perry/idm/users', last_name, token)
      return [] if response.status == 404
      response.body.map { |result| User.new(result) }
    end

    def get_users_details(id, token, last_name = '')
      response = @http_service.get("/perry/idm/users/#{id}", last_name, token)
      return {} if response.status == 404
      User.new(response.body)
    end

    def update_user(id, parameters, token)
      response = @http_service.patch("/perry/idm/users/#{id}", parameters, token)
      User.new(response.body)
    end
  end
end
