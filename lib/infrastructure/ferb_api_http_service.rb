# frozen_string_literal: true

module Infrastructure
  class FerbApiHttpService
    def initialize(base_url = Rails.configuration.micro_services['ferb_api_base_url'])
      @base_url = base_url
    end

    def get(url, token)
      http_connection.get("#{url}?token=#{token}")
    rescue StandardError
      return Faraday::Response.new(status: 404)
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
