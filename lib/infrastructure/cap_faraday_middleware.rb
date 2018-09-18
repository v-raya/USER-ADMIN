# frozen_string_literal: true

require 'faraday'
require_relative './api_error'

module CapFaradayMiddleware
  # custom faraday handle error exception class
  class ApiErrorException < Faraday::Middleware
    def initialize(app)
      super app
      @parser = nil
    end

    def call(env)
      @app.call(env).on_complete do |response|
        handle_response(response)
      end
    end

    private

    def handle_response(response)
      status = response[:status]
      raise_error(response) if status >= 400 && status != 404
    end

    def raise_error(response)
      json_response = JSON.parse(response.body.to_json)
      raise ApiError.new(json_response, response[:status])
    end
  end
end
