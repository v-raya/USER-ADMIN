# frozen_string_literal: true

require 'rails_helper'

module Infrastructure
  describe HttpService do
    let(:connection) { instance_double('Faraday::Connection') }
    let(:last_name) { 'my_name' }

    describe '#get' do
      context 'returns a valid API response' do
        it 'makes a get request' do
          allow(Faraday).to receive(:new)
            .with(url: 'https://perry.test')
            .and_return(connection)
          expect(connection).to receive(:get)
            .with("/resource?lastName=#{last_name}&token=showbiz_pizza_token")
          Infrastructure::HttpService.new.get('/resource', last_name, 'showbiz_pizza_token')
        end

        it 'sets json and uses the default adapter' do
          allow(Faraday).to receive(:new)
            .with(url: 'https://perry.test')
            .and_yield(connection).and_return(connection)
          expect(connection)
            .to receive(:response)
            .with(:json, parser_options: { symbolize_names: true })
          expect(connection).to receive(:adapter).with(Faraday.default_adapter)
          allow(connection)
            .to receive(:get)
            .with("/resource?lastName=#{last_name}&token=showbiz_pizza_token")
          Infrastructure::HttpService.new.get('/resource', last_name, 'showbiz_pizza_token')
        end
      end

      context 'returns an API error' do
        it 'returns a 404' do
          allow(Faraday).to receive(:new)
            .with(url: 'https://perry.test')
            .and_yield(connection).and_return(connection)
          allow(connection)
            .to receive(:response)
            .with(:json, parser_options: { symbolize_names: true })
            .and_raise('error message')
          expect(Infrastructure::HttpService.new
            .get('/resource', last_name, 'showbiz_pizza_token').status).to eq 404
        end
      end
    end

    describe '#post' do
      let(:request) { instance_double('Faraday::Request') }
      let(:post_parameters) { {} }
      let(:headers) { { 'Content-Type': 'URL-encoded' } }

      it 'sets json and uses the default adapter' do
        expect(Faraday)
          .to receive(:new)
          .with(url: 'https://perry.test')
          .and_yield(connection)
          .and_return(connection)
        expect(connection)
          .to receive(:response)
          .with(:json, parser_options: { symbolize_names: true })
        expect(connection).to receive(:adapter).with(Faraday.default_adapter)
        allow(connection)
          .to receive(:post)
          .with(no_args)
          .and_yield(request)
        allow(request)
          .to receive(:url)
          .with('/resource?token=showbiz_pizza_token')
        allow(request)
          .to receive(:headers)
          .and_return(headers)
        allow(request)
          .to receive(:body=)
          .with('{}')
        Infrastructure::HttpService.new.post('/resource', post_parameters, 'showbiz_pizza_token')
      end

      it 'makes a post request requiring JSON' do
        allow(Faraday)
          .to receive(:new)
          .with(url: 'https://perry.test')
          .and_yield(connection).and_return(connection)
        allow(connection)
          .to receive(:response)
          .with(:json, parser_options: { symbolize_names: true })
        allow(connection).to receive(:adapter).with(Faraday.default_adapter)
        expect(connection)
          .to receive(:post)
          .with(no_args)
          .and_yield(request)
        expect(request)
          .to receive(:url)
          .with('/resource?token=showbiz_pizza_token')
        expect(request)
          .to receive(:headers)
          .and_return(headers)
        expect(request)
          .to receive(:body=)
          .with('{}')
        Infrastructure::HttpService.new.post('/resource', post_parameters, 'showbiz_pizza_token')
        expect(headers['Content-Type']).to eq 'application/json'
      end
    end

    describe '#put' do
      let(:request) { instance_double('Faraday::Request') }
      let(:put_parameters) { {} }
      let(:headers) { { 'Content-Type': 'URL-encoded' } }

      it 'sets json and uses the default adapter' do
        expect(Faraday)
          .to receive(:new)
          .with(url: 'https://perry.test')
          .and_yield(connection)
          .and_return(connection)
        expect(connection)
          .to receive(:response)
          .with(:json, parser_options: { symbolize_names: true })
        expect(connection).to receive(:adapter).with(Faraday.default_adapter)
        allow(connection)
          .to receive(:put)
          .with(no_args)
          .and_yield(request)
        allow(request)
          .to receive(:url)
          .with('/resource?token=showbiz_pizza_token')
        allow(request)
          .to receive(:headers)
          .and_return(headers)
        allow(request)
          .to receive(:body=)
          .with('{}')
        Infrastructure::HttpService.new.put('/resource', put_parameters, 'showbiz_pizza_token')
      end

      it 'makes a put request requiring JSON' do
        allow(Faraday)
          .to receive(:new)
          .with(url: 'https://perry.test')
          .and_yield(connection).and_return(connection)
        allow(connection)
          .to receive(:response)
          .with(:json, parser_options: { symbolize_names: true })
        allow(connection).to receive(:adapter).with(Faraday.default_adapter)
        expect(connection)
          .to receive(:put)
          .with(no_args)
          .and_yield(request)
        expect(request)
          .to receive(:url)
          .with('/resource?token=showbiz_pizza_token')
        expect(request)
          .to receive(:headers)
          .and_return(headers)
        expect(request)
          .to receive(:body=)
          .with('{}')
        Infrastructure::HttpService.new.put('/resource', put_parameters, 'showbiz_pizza_token')
        expect(headers['Content-Type']).to eq 'application/json'
      end
    end
  end
end
