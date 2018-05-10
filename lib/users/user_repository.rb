# frozen_string_literal: true

module Users
    class UserRepository
      def initialize(http_service = Infrastructure::HttpService.new)
        @http_service = http_service
      end

      def get_users(token) 
        response = @http_service.get("/perry/idm/users", token)
        return [] if response.status == 404
        response.body.map { |result| User.new(result) }
      end
    end
  end
