# frozen_string_literal: true

# rubocop:disable Style/RedundantReturn

module Infrastructure
  class HttpService
    def initialize(base_url = Rails.configuration.micro_services['perry_api_base_url'])
      @base_url = base_url
    end

    def get(url, last_name, token)
      http_connection.get("#{url}?lastName=#{last_name}&token=#{token}")
    rescue StandardError
      return Faraday::Response.new(status: 404)
    end

    def get_permissions(url, token)
      http_connection.get("#{url}?token=#{token}")
    rescue StandardError
      return Faraday::Response.new(status: 404)
    end

    def post(url, parameters, token)
      http_connection.post do |request|
        request.url "#{url}?token=#{token}"
        request.headers['Content-Type'] = 'application/json'
        request.body = JSON.generate(parameters)
      end
    end

    def put(url, parameters, token)
      http_connection.put do |request|
        request.url "#{url}?token=#{token}"
        request.headers['Content-Type'] = 'application/json'
        request.body = JSON.generate(parameters)
      end
    end

    private

    def http_connection
      Faraday.new(url: @base_url) do |connection|
        connection.response :json, parser_options: { symbolize_names: true }
        connection.adapter Faraday.default_adapter
      end
    end
  end
end
# rubocop:enable Style/RedundantReturn
