# frozen_string_literal: true

require 'capybara'
require 'capybara/rspec'
require 'capybara-screenshot/rspec'
require 'acceptance/support/login_helper'
require 'acceptance/support/user_list_page_helpers'
require 'acceptance/support/user_detail_page_helpers'
require 'selenium/webdriver'

Capybara.register_driver :selenium do |app|
  Capybara::Selenium::Driver.new(app, browser: :chrome)
end

Capybara.javascript_driver = :chrome_headless

def check_accessibility
  expect(page).to be_accessible
end

Capybara.configure do |config|
  include LoginHelper
  include UserListPageHelper
  include UserDetailPageHelper
  config.default_max_wait_time = 10
  config.default_driver = :selenium
  config.app_host = ENV.fetch('COUNTY_ADMIN_WEB_BASE_URL', 'http://localhost:3000')
  Capybara.save_path = 'tmp/capybara'
  Capybara::Screenshot.register_filename_prefix_formatter(:rspec) do |example|
    "screenshot_#{example.description.gsub(' ', '-').gsub(/^.*\/spec\//,'')}"
  end
end
