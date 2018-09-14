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
    end

    describe '#add_user' do
      let(:response) { instance_double('Faraday::Response') }
      let(:location) { 'http://www.google.com/assnlk123-afdb1324-we132' }
      params = {
        enable: 'true',
        permissions: %w[snapshot hotline]
      }

      context 'with user' do
        it 'add user' do
          allow(response).to receive(:headers).and_return(location)
          allow(http_service)
            .to receive(:post)
            .with('/perry/idm/users', params, token)
            .and_return(response)
          expect(user_repository.add_user(params, token))
            .to eq 'http://www.google.com/assnlk123-afdb1324-we132'
        end
      end
    end
  end

  describe '.search' do
    let(:search_server) { Infrastructure::HttpService.new('http://stub.example.com') }
    let(:hits) do
      { total: 303,
        hits: [
          {
            "_source": {
              "id": 'xxx-yyy-111-222',
              "email": 'example@email.com'
            }
          }
        ] }
    end
    let(:good_response) do
      double(
        status: 200,
        body: {
          "took": 4,
          "timed_out": false,
          "hits": hits
        }
      )
    end
    let(:token) { 'token' }
    before do
      allow(search_server).to receive(:post).with('/dora/users/user/_search', 'my query', token)
                                            .and_return(good_response)
      allow(Infrastructure::HttpService).to receive(:new).with('https://dora.test')
                                                         .and_return(search_server)
    end

    it 'posts the given token to a search service' do
      expect(UserRepository.search('my query', 'token')).to eq(hits)
    end

    describe 'when search service has a problem' do
      let(:bad_response) do
        double(
          body: '
           "issue_details": [
              {
                "incident_id": "d0bc4e4f-ee62-4955-bbba-e532c9f34834",
                "type": "expected_exception",
                "user_message": \
"There was an error processing your request. It has been logged with unique incident id",
                "technical_message": \
"POST http://es-inst-1.demo-int.cwds.io:9200/users/user/_search: \
HTTP/1.1 404 Not Found\n{\"error\":{\"root_cause\":[{\"type\":\"index_not_found_exception\",\
\"reason\":\"no such index\",\"resource.type\":\"index_or_alias\",\"resource.id\":\"users\",\
\"index_uuid\":\"_na_\",\"index\":\"users\"}],\"type\":\"index_not_found_exception\",\
\"reason\":\"no such index\",\"resource.type\":\"index_or_alias\", \"resource.id\":\"users\"\
,\"index_uuid\":\"_na_\",\"index\":\"users\"},\"status\":404}"
              }
            ]',
          status: 404
        )
      end

      before do
        allow(search_server).to receive(:post).with('/dora/users/user/_search', 'my query', token)
                                              .and_return(bad_response)
      end

      it 'posts the given token to a search service' do
        expect(UserRepository.search('my query', 'token')).to eq(bad_response.body)
      end
    end
  end
end
