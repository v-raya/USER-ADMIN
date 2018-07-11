# frozen_string_literal: true

require 'rails_helper'

module Api
  describe UserListController do
    describe '#index' do
      let(:user_repository) { instance_double('User::UserRepository') }
      let(:user) { Users::User.new(username: 'el') }
      let(:search_key) { 'My name' }

      it 'has a route' do
        expect(get: 'api/user_list').to route_to(
          controller: 'api/user_list',
          action: 'index',
          format: 'json'
        )
      end

      describe 'when no params are passed' do
        it 'returns a userlist' do
          allow(Users::UserRepository).to receive(:new)
            .with(no_args).and_return(user_repository)

          api_response = { hits: { hits: [_source: user] } }
          allow(Users::User).to receive(:search).with({ query: { match_all: {} } }, 'token')
                                                .and_return(api_response)
          request.session[:token] = 'token'
          get :index
          expect(response.body).to eq [user].to_json
        end
      end

      describe 'when search params are passed' do
        it 'returns a userlist / search limited by last_name' do
          api_response = {
            hits: {
              hits:
                [_source: user]
            }
          }

          allow(Users::UserRepository).to receive(:new)
            .with(no_args).and_return(user_repository)
          allow(Users::User).to receive(:search).with({ query: { match: { last_name: 'El' } },
                                                        from: nil, size: nil, sort: [] }, 'token')
                                                .and_return(api_response)
          request.session[:token] = 'token'
          get :index, params: { last_name: 'El' }
          expect(response.body).to eq [user].to_json
        end
      end
    end
  end
end
