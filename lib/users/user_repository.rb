# frozen_string_literal: true

module Users
  class UserRepository
    def initialize(http_service = Infrastructure::HttpService.new)
      @http_service = http_service
    end

    def get_users(token)
      response = @http_service.get('/perry/idm/users', token)
      return [] if response.status == 404
      response.body.map { |result| User.new(result) }
    end

    def search_users(id, token)
      response = @http_service.get_users("/perry/idm/users", id, token)
      return [] if response.status == 404
      response.body.map { |result| User.new(result) }
    end

    def get_users_details(id, token)
      response = @http_service.get("/perry/idm/users/#{id}", token)
      return {} if response.status == 404
      User.new(response.body)
    end
  end
end
