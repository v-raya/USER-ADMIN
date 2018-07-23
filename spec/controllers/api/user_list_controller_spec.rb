# frozen_string_literal: true

require 'rails_helper'

module Api
  describe UserListController do
    # describe '#index_legacy' do
    #   let(:user_repository) { instance_double('User::UserRepository') }
    #   let(:user) { Users::User.new(username: 'el') }

    #   it 'returns a userlist' do
    #     allow(Elastic::QueryBuilder).to receive(:elastic_search?).and_return(false)
    #     allow(Users::UserRepository).to receive(:new)
    #       .with(no_args).and_return(user_repository)
    #     allow(user_repository).to receive(:get_users).with({}, 'token').and_return(user)
    #     request.session[:token] = 'token'
    #     get :index
    #     expect(response.body).to eq user.to_json
    #   end
    # end

    # describe '#index' do
    #   let(:user_repository) { instance_double('User::UserRepository') }
    #   let(:user) { Users::User.new(username: 'el') }
    #   let(:search_key) { 'My name' }
    #   let(:match_all_query) { { query: { match_all: {} } } }

    #   it 'has a route' do
    #     expect(get: 'api/user_list').to route_to(
    #       controller: 'api/user_list',
    #       action: 'index',
    #       format: 'json'
    #     )
    #   end

    #   describe 'when no params are passed' do
    #     it 'returns a userlist' do
    #       allow(Users::UserRepository).to receive(:new)
    #         .with(no_args).and_return(user_repository)

    #       api_response = { hits: { hits: [_source: user] } }
    #       allow(Users::UserRepository).to receive(:search).with(match_all_query, 'token')
    #                                                       .and_return(api_response)
    #       request.session[:token] = 'token'
    #       get :index
    #       expect(response.body).to eq [user].to_json
    #     end
    #   end

    #   describe 'when search params are passed' do
    #     let(:api_response) { { hits: { hits: [_source: user] } } }

    #     before do
    #       allow(Users::UserRepository).to receive(:new)
    #         .with(no_args).and_return(user_repository)
    #       request.session[:token] = 'token'
    #     end
    #     it 'returns a userlist / search limited by last_name' do
    #       allow(Users::UserRepository).to receive(:search).with(
    #         { query: { match_phrase_prefix: { last_name: 'El' } },
    #           from: 0, size: 50, sort: [] }, 'token'
    #       ).and_return(api_response)
    #       get :index, params: { last_name: 'El' }
    #       expect(response.body).to eq [user].to_json
    #     end
    #     it 'empty search params are ignored' do
    #       allow(Users::UserRepository).to receive(:search).with(match_all_query, 'token')
    #                                                       .and_return(api_response)

    #       get :index, params: { last_name: '' }
    #       expect(response.body).to eq [user].to_json
    #     end
    #   end
    # end
  end
end
