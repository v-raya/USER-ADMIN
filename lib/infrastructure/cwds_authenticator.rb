# frozen_string_literal: true

module Infrastructure
  class CwdsAuthenticator
    def initialize(application)
      @application = application
    end

    def call(environment)
      return @application.call(environment) unless Feature.active?(:authentication)

      request = Rack::Request.new(environment)
      return redirect_to_login(request.url) unless SecurityPolicy.new.validate_access(request)

      @application.call(environment)
    end

    private

    def redirect_to_login(url)
      callback = QueryParamRemover.new.remove_query_param(url, 'token')
      [301, { 'Location' => Infrastructure::SecurityGateway.get_new_url(callback, 'login') }, []]
    end
  end
end
