require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module CountyAdmin
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1
    # Rails.application.config.active_record.sqlite3.represent_boolean_as_integer = true
    config.autoload_paths << Rails.root.join('lib')
    config.eager_load_paths << Rails.root.join('lib')

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    require 'infrastructure/cwds_authenticator'
    config.middleware.use Infrastructure::CwdsAuthenticator
    
    config.micro_services = config_for(:micro_services)
    config.relative_url_root = ENV['RAILS_RELATIVE_URL_ROOT'] || '/'
    config.assets.prefix = "#{ENV['RAILS_RELATIVE_URL_ROOT']}/assets"
  end
end
