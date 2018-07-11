# frozen_string_literal: true

module Users
  class UserRepository
    def initialize(http_service = Infrastructure::HttpService.new)
      @http_service = http_service
    end

    def get_users(parameters, token)
      params = sanitize_keys(parameters)
      response = @http_service.get('/perry/idm/users', params, token)
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

    def add_user(parameters, token)
      response = @http_service.post('/perry/idm/users', parameters, token)
      response.headers
    end

    private

    def sanitize_keys(value)
      Hash[value.map do |k, v|
        [k.to_s.camelize(:lower), v]
      end].delete_if { |_k, v| v == '' }
    end
  end
end
