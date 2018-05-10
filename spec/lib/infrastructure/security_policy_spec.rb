# frozen_string_literal: true

require 'rails_helper'

module Infrastructure
  describe SecurityPolicy do
    describe '#validate_access' do
      let(:security_gateway) { instance_double('Infrastructure::SecurityGateway') }
      let(:security_policy) { SecurityPolicy.new(security_gateway) }

      context 'with valid access code' do
        let(:environment) do
          Rack::MockRequest.env_for('http://example.com?accessCode=good_code', {})
        end

        it 'stores a valid token in session' do
          request = Rack::Request.new(environment)
          allow(security_gateway).to receive(:fetch_new_token)
            .with('good_code').and_return('some_token')
          security_policy.validate_access(request)
          expect(request.session['token']).to eq 'some_token'
        end
      end

      context 'with invalid access code' do
        let(:environment) do
          Rack::MockRequest.env_for('http://example.com?accessCode=with_bad_accessCode', {})
        end

        it 'returns false' do
          request = Rack::Request.new(environment)
          allow(security_gateway).to receive(:fetch_new_token)
            .with('with_bad_accessCode').and_return(nil)
          expect(security_policy.validate_access(request)).to eq nil
        end
      end

      context 'with existing valid session token' do
        let(:environment) do
          Rack::MockRequest.env_for('http://example.com', {})
        end

        it 'returns validated token from session' do
          request = Rack::Request.new(environment)
          request.session['token'] = 'good_token'
          allow(security_gateway).to receive(:validate_token)
            .with('good_token').and_return('good_token')
          security_policy.validate_access(request)
          expect(request.session['token']).to eq 'good_token'
        end
      end

      context 'with existing invalid session token' do
        let(:environment) do
          Rack::MockRequest.env_for('http://example.com?accessCode=good_accessCode', {})
        end

        it 'saves new token to session' do
          request = Rack::Request.new(environment)
          request.session['token'] = 'invalid_token'
          allow(security_gateway).to receive(:validate_token)
            .with('invalid_token').and_return(nil)
          allow(security_gateway).to receive(:fetch_new_token)
            .with('good_accessCode').and_return('new_token')
          security_policy.validate_access(request)
          expect(request.session['token']).to eq 'new_token'
        end
      end
    end

    describe '#valid?', skip: true do
      let(:environment) { Rack::MockRequest.env_for('http://example.com?token=sometoken', {}) }
      let(:security_gateway) { instance_double('Infrastructure::SecurityGateway') }
      let(:security_policy) { SecurityPolicy.new(security_gateway) }

      before do
        allow(security_gateway).to receive(:validate_token).with('valid_token').and_return(true)
      end

      context 'with no token or session' do
        let(:environment) { Rack::MockRequest.env_for('http://example.com', {}) }

        it 'returns false' do
          request = Rack::Request.new(environment)
          expect(security_policy.valid?(request)).to eq false
        end
      end

      context 'with a valid accessCode' do
        let(:environment) do
          Rack::MockRequest.env_for('http://example.com?accessCode=someCode', {})
        end

        it 'returns true' do
          request = Rack::Request.new(environment)
          expect(security_policy.valid?(request)).to eq true
        end
      end

      context 'with an empty token' do
        let(:environment) { Rack::MockRequest.env_for('http://example.com?token=', {}) }

        it 'returns false' do
          request = Rack::Request.new(environment)
          expect(security_policy.valid?(request)).to eq false
        end
      end

      context 'with just a session' do
        let(:environment) { Rack::MockRequest.env_for('http://example.com') }

        context 'with a valid session' do
          it 'returns true' do
            allow(security_gateway).to receive(:validate_token)
              .with('valid_token').and_return(true)
            request = Rack::Request.new(environment)
            request.session['token'] = 'valid_token'
            expect(security_policy.valid?(request)).to eq true
          end
        end

        context 'with an invalid session' do
          it 'returns true' do
            allow(security_gateway).to receive(:validate_token)
              .with('invalid_token').and_return(false)
            request = Rack::Request.new(environment)
            request.session['token'] = 'invalid_token'
            expect(security_policy.valid?(request)).to eq false
          end
        end
      end

      context 'with just a token' do
        let(:environment) { Rack::MockRequest.env_for('http://example.com?token=some_token') }

        context 'with a valid token' do
          it 'returns true' do
            allow(security_gateway).to receive(:validate_token)
              .with('some_token').and_return(true)
            request = Rack::Request.new(environment)
            expect(security_policy.valid?(request)).to eq true
          end
        end

        context 'with an invalid token' do
          it 'returns true' do
            allow(security_gateway).to receive(:validate_token)
              .with('some_token').and_return(false)
            request = Rack::Request.new(environment)
            expect(security_policy.valid?(request)).to eq false
          end
        end
      end
    end
  end
end
