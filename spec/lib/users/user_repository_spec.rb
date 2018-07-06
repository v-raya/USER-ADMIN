# frozen_string_literal: true

require 'spec_helper'

module Users
  describe UserRepository do
    let(:http_service) { instance_double('Infrastructure::HttpService') }
    let(:user_repository) { UserRepository.new(http_service) }
    let(:token) { 'sample_token' }
    let(:params) { { 'lastName' => 'pop' } }

    describe '#get_users' do
      let(:response) { instance_double('Faraday::Response') }

      context 'with no user' do
        it 'returns an empty user' do
          allow(response).to receive(:status).and_return(404)
          allow(http_service)
            .to receive(:get)
            .with('/perry/idm/users', params, token)
            .and_return(response)
          expect(user_repository.get_users(params, token)).to eq([])
        end
      end

      context 'with users' do
        let(:parameter) { { 'lastName' => '' } }
        it 'returns users without params' do
          allow(response).to receive(:status).and_return(200)
          allow(response).to receive(:body).and_return([{ username: 'El' }])
          allow(http_service)
            .to receive(:get)
            .with('/perry/idm/users', {}, token)
            .and_return(response)
          expect(user_repository.get_users(parameter, token)).to eq [User.new(username: 'El')]
        end
      end

      context 'with a user' do
        it 'returns a user' do
          allow(response).to receive(:status).and_return(200)
          allow(response).to receive(:body).and_return([{ username: 'El' }])
          allow(http_service)
            .to receive(:get)
            .with('/perry/idm/users', params, token)
            .and_return(response)
          expect(user_repository.get_users(params, token))
            .to eq [User.new(username: 'El')]
        end
      end
    end

    describe '#get_users_details' do
      let(:response) { instance_double('Faraday::Response') }

      context 'with no user' do
        it 'returns an empty user_detail' do
          allow(response).to receive(:status).and_return(404)
          allow(http_service)
            .to receive(:get)
            .with('/perry/idm/users/22', token)
            .and_return(response)
          expect(user_repository.get_users_details('22', token)).to eq({})
        end
      end

      context 'with a user' do
        it 'returns a user_detail' do
          allow(response).to receive(:status).and_return(200)
          allow(response).to receive(:body).and_return(id: 'El')
          allow(http_service)
            .to receive(:get)
            .with('/perry/idm/users/33', token)
            .and_return(response)
          expect(user_repository.get_users_details('33', token))
            .to eq User.new(id: 'El')
        end
      end
    end

    describe '#get_permissions_list' do
      let(:response) { instance_double('Faraday::Response') }

      context 'with no permissions' do
        it 'returns an empty permissions list' do
          allow(response).to receive(:status).and_return(404)
          allow(http_service)
            .to receive(:get)
            .with('/perry/idm/permissions', token)
            .and_return(response)
          expect(user_repository.get_permissions_list(token)).to eq([])
        end
      end

      context 'with a list' do
        it 'returns a permissions list' do
          allow(response).to receive(:status).and_return(200)
          allow(response).to receive(:body).and_return(['el'])
          allow(http_service)
            .to receive(:get)
            .with('/perry/idm/permissions', token)
            .and_return(response)
          expect(user_repository.get_permissions_list(token))
            .to eq ['el']
        end
      end
    end

    describe '#update_user' do
      let(:response) { instance_double('Faraday::Response') }
      params = {
        enable: 'true',
        permissions: %w[snapshot hotline]
      }

      context 'with user' do
        it 'updates a user' do
          allow(response).to receive(:body).and_return(
            id: '55',
            enabled: 'true',
            permissions: %w[snapshot hotline]
          )
          allow(http_service)
            .to receive(:patch)
            .with('/perry/idm/users/55', params, token)
            .and_return(response)
          expect(user_repository.update_user('55', params, token))
            .to eq User.new(id: '55', enabled: 'true', permissions: %w[snapshot hotline])
        end
      end
    end

    describe '#verify_user' do
      let(:response) { instance_double('Faraday::Response') }
      params = {
        RACFID: 'true',
        email: 'verifyme@gmail.com'
      }

      context 'with no data' do
        it 'returns an empty response' do
          allow(response).to receive(:status).and_return(404)
          allow(http_service)
            .to receive(:get)
            .with('/perry/idm/users/verify', params, token)
            .and_return(response)
          expect(user_repository.verify_user(params, token)).to eq({})
        end
      end

      context 'verify a user' do
        it 'returns a response' do
          allow(response).to receive(:status).and_return(200)
          allow(response).to receive(:body)
            .and_return(verification_passed: 'True', verification_message: 'No user')
          allow(http_service)
            .to receive(:get)
            .with('/perry/idm/users/verify', params, token)
            .and_return(response)
          expect(user_repository.verify_user(params, token))
            .to eq VerifyUser.new(verification_passed: 'True', verification_message: 'No user')
        end
      end

      describe '#create_user' do
      let(:response) { instance_double('Faraday::Response') }
      params = {
        enable: 'true',
        permissions: %w[snapshot hotline]
      }

      context 'with user' do 
        it 'creates user' do
          allow(response).to receive(:body).and_return(
            id: '55',
            enabled: 'true',
            permissions: %w[snapshot hotline]
          )
          allow(http_service)
            .to receive(:post)
            .with('/perry/idm/users', params, token)
            .and_return(response)
          expect(user_repository.create_user(params, token))
            .to eq VerifyUser.new(id: '55', enabled: 'true', permissions: %w[snapshot hotline])
        end
      end
    end
    end
  end
end
