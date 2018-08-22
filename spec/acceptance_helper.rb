# frozen_string_literal: true

require 'capybara'
require 'capybara/rspec'
require 'capybara/accessible'
require 'acceptance/support/login_helper'
require 'acceptance/support/user_list_page_helpers'
require 'acceptance/support/user_detail_page_helpers'
require 'selenium/webdriver'

Capybara.register_driver :accessible_selenium do |app|
  capability_options = %w[headless disable-gpu no-sandbox]
  capabilities = Selenium::WebDriver::Remote::Capabilities.chrome(
    chromeOptions: { args: capability_options }
  )
  driver = Capybara::Selenium::Driver.new(app, browser: :chrome, desired_capabilities: capabilities)
  adaptor = Capybara::Accessible::SeleniumDriverAdapter.new
  Capybara::Accessible.setup(driver, adaptor)
end

Capybara.javascript_driver = :accessible_selenium

Capybara.configure do |config|
  include LoginHelper
  include UserListPageHelper
  include UserDetailPageHelper
  config.default_max_wait_time = 10
  config.default_driver = config.javascript_driver
  config.app_host = ENV.fetch('COUNTY_ADMIN_WEB_BASE_URL', 'http://localhost:3000')
end
