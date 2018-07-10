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

    def get_users_details_by_url(url, token)
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
      puts "PARAMETER GOT BEFORE ADD #{parameters}"
      response = @http_service.post("/perry/idm/users", parameters, token)
      return response.headers['location']
    end

    private

    def sanitize_keys(value)
      Hash[value.map do |k, v|
        [k.to_s.camelize(:lower), v]
      end].delete_if { |_k, v| v == '' }
    end
  end
end



#ADD USER OBJECT

# {
#     "email": "captester10@gmail.com",
#     "first_name": "User1",
#     "last_name": "Two1",
#     "county_name": "Madera",
#     "user_create_date": "2018-06-07",
#     "user_last_modified_date": "2018-06-07",
#     "enabled": true,
#     "status": "FORCE_CHANGE_PASSWORD",
#     "permissions": [
#       "Snapshot-rollout",
#       "Hotline-rollout"
#     ]
#   }