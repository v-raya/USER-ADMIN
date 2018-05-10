# frozen_string_literal: true

require 'rails_helper'
require 'feature/testing'

module Infrastructure
  describe CwdsAuthenticator do
    describe '#call' do
      let(:application) { instance_double('ActionDispatch::Routing::RouteSet') }
      let(:cwds_authenticator) { CwdsAuthenticator.new(application) }
      let(:security_policy) { instance_double('Infrastructure::SecurityPolicy') }
      let(:security_gateway) { instance_double('Infrastructure::SecurityGateway') }

      before do
        allow(SecurityPolicy).to receive(:new).with(no_args).and_return(security_policy)
        allow(SecurityGateway).to receive(:new).with(no_args).and_return(security_gateway)
      end

      context 'when there is no session and no access code' do
        let(:environment) { Rack::MockRequest.env_for('http://example.com/', {}) }

        it 'redirects the user to perry login url' do
          Feature.run_with_activated(:authentication) do
            allow(security_policy).to receive(:validate_access)
              .with(instance_of(Rack::Request)).and_return(nil)
            status, headers = cwds_authenticator.call(environment)
            expect(status).to eq 301
            expect(headers['Location']).to eq 'https://perry.test/authn/login?callback=http://example.com/'
          end
        end
      end

      context 'with feature checking' do
        context 'when authentication feature is active' do
          it 'checks valid authentication' do
            Feature.run_with_activated(:authentication) do
              environment = Rack::MockRequest.env_for('http://example.com/', {})
              allow(security_policy).to receive(:validate_access)
                .with(instance_of(Rack::Request)).and_return(nil)
              status, _headers = cwds_authenticator.call(environment)
              expect(status).to eq 301
            end
          end

          it 'redirects to perry with no token param' do
            Feature.run_with_activated(:authentication) do
              environment = Rack::MockRequest.env_for('http://example.com?token=old', {})
              allow(security_policy).to receive(:validate_access)
                .with(instance_of(Rack::Request)).and_return(nil)
              status, headers = cwds_authenticator.call(environment)
              expect(status).to eq 301
              expect(headers['Location']).to eq 'https://perry.test/authn/login?callback=http://example.com/'
            end
          end

          it 'redirects to perry with no token param while leaving other params' do
            Feature.run_with_activated(:authentication) do
              environment = Rack::MockRequest.env_for('http://example.com?token=old&param=two', {})
              allow(security_policy).to receive(:validate_access)
                .with(instance_of(Rack::Request)).and_return(nil)
              status, headers = cwds_authenticator.call(environment)
              expect(status).to eq 301
              expect(headers['Location']).to eq 'https://perry.test/authn/login?callback=http://example.com/?param=two'
            end
          end
        end

        context 'when authentication feature is inactive' do
          let(:environment) { Rack::MockRequest.env_for('http://example.com/', {}) }
          it 'skips authentication checking' do
            Feature.run_with_deactivated(:authentication) do
              allow(application).to receive(:call).with(environment).and_return([200, {}, {}])
              status, _headers = cwds_authenticator.call(environment)
              expect(status).to eq 200
            end
          end
        end
      end

      context 'when there is an accessCode' do
        let(:environment) do
          Rack::MockRequest.env_for('http://example.com?accessCode=someCode', {})
        end

        context 'when accessCode is valid' do
          let(:response) { Faraday::Response.new(status: 200) }

          it 'allows user access to the application' do
            allow(application).to receive(:call).with(environment).and_return([200, {}, {}])
            allow(security_policy).to receive(:validate_access)
              .with(instance_of(Rack::Request)).and_return('some_token')
            status, _headers, _body = cwds_authenticator.call(environment)
            expect(status).to eq 200
          end
        end

        context 'when accessCode is invalid' do
          let(:response) { Faraday::Response.new(status: 406) }

          it 'redirects to the perry login page' do
            Feature.run_with_activated(:authentication) do
              allow(security_policy).to receive(:validate_access)
                .with(instance_of(Rack::Request)).and_return(nil)
              status, headers = cwds_authenticator.call(environment)
              expect(status).to eq 301
              expect(headers['Location']).to eq 'https://perry.test/authn/login' \
                '?callback=http://example.com/?accessCode=someCode'
            end
          end
        end
      end

      context 'when there is a session' do
        context 'when session is valid' do
          let(:session_config) { { 'rack.session' => { 'token' => 'some_token' } } }
          let(:environment) { Rack::MockRequest.env_for('http://example.com', session_config) }
          let(:response) { Faraday::Response.new(status: 200) }

          it 'allows user access to the application' do
            allow(application).to receive(:call).with(environment).and_return([200, {}, {}])
            allow(security_policy).to receive(:validate_access)
              .with(instance_of(Rack::Request)).and_return('some_token')
            status, _headers, _body = cwds_authenticator.call(environment)
            expect(status).to eq 200
          end

          it 'does not change the session token' do
            allow(application).to receive(:call).with(environment).and_return([200, {}, {}])
            allow(security_policy).to receive(:validate_access)
              .with(instance_of(Rack::Request)).and_return('some_token')
            cwds_authenticator.call(environment)
            expect(Rack::Request.new(environment).session['token']).to eq 'some_token'
          end
        end

        context 'when session token is invalid' do
          let(:session_config) { { 'rack.session' => { 'token' => 'old_token' } } }
          let(:environment) do
            Rack::MockRequest.env_for('http://example.com/hello?token=to_remove&other_param=to_stay',
                                      session_config)
          end
          let(:response) { Faraday::Response.new(status: 406) }

          it 'redirects to the perry login page and removed old token from query' do
            Feature.run_with_activated(:authentication) do
              allow(security_policy).to receive(:validate_access)
                .with(instance_of(Rack::Request)).and_return(false)
              status, headers = cwds_authenticator.call(environment)
              expect(status).to eq 301
              expect(headers['Location']).to eq 'https://perry.test/authn/login' \
                '?callback=http://example.com/hello?other_param=to_stay'
            end
          end
        end
      end
    end
  end
end
