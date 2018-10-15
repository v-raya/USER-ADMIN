# frozen_string_literal: true

source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

gem 'addressable', '~> 2.5.2'
# rubocop:disable Bundler/OrderedGems
gem 'bootstrap-sass', '~> 3.3.6'
gem 'bootstrap'
# rubocop:enable Bundler/OrderedGems#
gem 'dry-struct', '~> 0.4.0'
gem 'dry-types', '~> 0.12.2'
gem 'faraday', '~> 0.13.1'
gem 'faraday_middleware', '~> 0.12.2'
gem 'feature'

gem 'newrelic_rpm', '~> 5.4', '>= 5.4.0.347'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.1', '= 5.1.6'

gem 'redis-rails', '~> 5.0'

# Use sqlite3 as the database for Active Record
gem 'sqlite3'
# Use Puma as the app server
gem 'puma', '~> 3.7'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use SimpleCov for rspec unit test coverage
gem 'simplecov', '~> 0.15.1'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
gem 'webpacker'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 3.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '~> 2.13'
  gem 'dotenv-rails'
  gem 'foreman', '~> 0.84.0'
  gem 'pry'
  gem 'pry-byebug'
  gem 'selenium-webdriver'
end

group :development do
  gem 'brakeman'
  gem 'bundler-audit'
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'rubocop'
  gem 'web-console', '>= 3.3.0'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :test do
  gem 'axe-matchers'
  # Adds support for Capybara system testing and selenium driver
  gem 'rails-controller-testing'
  gem 'rspec'
  gem 'rspec-dry-struct'
  gem 'rspec-rails'
  # Easy installation and use of chromedriver to run system tests with Chrome
  gem 'chromedriver-helper'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
