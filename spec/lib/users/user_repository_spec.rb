# frozen_string_literal: true

require 'spec_helper'

module Users
  describe UserRepository do
    let(:http_service) { instance_double('Infrastructure::HttpService') }
    let(:user_repository) { UserRepository.new(http_service) }
    let(:token) { 'sample_token' }

    describe '#get_user' do
      let(:response) { instance_double('Faraday::Response') }

      context 'with no user' do
        it 'returns an empty user' do
          allow(response).to receive(:status).and_return(404)
          allow(http_service)
            .to receive(:get)
            .with('/perry/idm/users', token)
            .and_return(response)
          expect(user_repository.get_users(token)).to eq([])
        end
      end

      context 'with a user' do
        it 'returns a user' do
          allow(response).to receive(:status).and_return(200)
          allow(response).to receive(:body).and_return([{ username: 'El' }])
          allow(http_service)
            .to receive(:get)
            .with('/perry/idm/users', token)
            .and_return(response)
          expect(user_repository.get_users(token))
            .to eq [User.new(username: 'El')]
        end
      end
    end
  end
end
