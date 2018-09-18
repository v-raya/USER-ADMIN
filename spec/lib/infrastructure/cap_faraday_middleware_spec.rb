# frozen_string_literal: true

require 'spec_helper'
require_relative '../../../lib/infrastructure/cap_faraday_middleware'

module CapFaradayMiddleware
  describe 'ApiErrorException' do
    let(:app) { instance_double('Cap::Application') }
    let(:env) { instance_double('Rack::Request') }
    let(:middleware) { ApiErrorException.new(app) }

    describe '#call' do
      context 'when response status < 400' do
        it 'does nothing' do
          response = Faraday::Response.new(status: 200)
          allow(app).to receive(:call).with(env).and_return(response)
          expect(middleware.call(env)).to eq(response)
        end
      end

      context 'when response status < 400 and not 404' do
        context 'when content is json' do
          it 'should raise api error if response is not 404 and greater than 400' do
            error_body = '{issue_details: [{message: \'Error Message\'}]}'
            response = Faraday::Response.new(status: 422, body: error_body.to_json)
            allow(app).to receive(:call).with(env).and_return(response)
            expect { middleware.call(env) }.to raise_error ApiError
          end
          it 'should not raise api error if status is 404' do
            error_body = '{issue_details: [{message: \'Error Message\'}]}'
            response = Faraday::Response.new(status: 404, body: error_body.to_json)
            allow(app).to receive(:call).with(env).and_return(response)
            expect { middleware.call(env) }.not_to raise_error
          end
        end
      end
    end
  end
end
