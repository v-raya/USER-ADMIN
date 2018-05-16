# frozen_string_literal: true

# This file is used by Rack-based servers to start the application.

require_relative 'config/environment'

app = Rack::Builder.new do
  map ENV['RAILS_RELATIVE_URL_ROOT'] || '/' do
    run CountyAdmin::Application
  end
end

run app
