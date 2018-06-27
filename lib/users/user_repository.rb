# frozen_string_literal: true

module Users
  class UserRepository
    def initialize(http_service = Infrastructure::HttpService.new)
      @http_service = http_service
    end

    def get_users(parameters, token)
      response = @http_service.get('/perry/idm/users', parameters, token)
      return [] if response.status == 404
      response.body.map { |result| User.new(result) }
    end

    def get_users_details(id, token)
      response = @http_service.get("/perry/idm/users/#{id}", token)
      return {} if response.status == 404
      User.new(response.body)
    end

    def update_user(id, parameters, token)
      response = @http_service.patch("/perry/idm/users/#{id}", parameters, token)
      User.new(response.body)
    end

    def verify_user(parameters, token)
      response = @http_service.get('/perry/idm/users/verify', parameters, token)
      return {} if response.status == 404
      VerifyUser.new(response.body)
    end

    def get_permissions_list(token)
      response = @http_service.get('/perry/idm/permissions', token)
      return [] if response.status == 404
      response.body { Permissions.new }
    end
  end
end
