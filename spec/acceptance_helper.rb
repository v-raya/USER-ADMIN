# frozen_string_literal: true

require 'capybara'
require 'capybara/rspec'
require 'capybara/accessible'
require 'acceptance/support/login_helper'
require 'selenium/webdriver'

Capybara.register_driver :selenium do |app|
  Capybara::Selenium::Driver.new(app, browser: :chrome)
end

Capybara.javascript_driver = :chrome_headless

Capybara.configure do |config|
  include LoginHelper

  config.default_max_wait_time = 10
  config.default_driver = :accessible_selenium
  Capybara.javascript_driver = Capybara.default_driver
  config.app_host = ENV.fetch('COUNTY_ADMIN_WEB_BASE_URL', 'http://localhost:3000')
  config.include LoginHelper
end
