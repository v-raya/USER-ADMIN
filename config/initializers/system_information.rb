SystemInformation.configure do |config|
  config.application = 'CARES Administration Portal'
  config.version = "#{ENV.fetch('APP_VERSION', '0.xx.xx')}"
  # Add all needed checks here following a symbol name/url string pattern
  config.checks =
    [
      { name: :redis,   url: "redis://#{ENV.fetch('REDIS_HOST', 'localhost')}:#{ENV.fetch('REDIS_PORT', 6379)}" },
      { name: :perry,   url: "#{ENV.fetch('PERRY_API_BASE_URL', 'http://localhost/perry')}/system-information" },
      { name: :dora_api, url: "#{ENV.fetch('BASE_SEARCH_API_URL', 'http://localhost/dora')}/system-information" }
    ]
end
