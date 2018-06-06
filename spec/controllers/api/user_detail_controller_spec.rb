# frozen_string_literal: true

require 'rails_helper'

module Api
  describe UserDetailController do
    let(:user_repository) { instance_double('User::UserRepository') }
    let(:user) { Users::User.new(username: 'el') }
    let(:token) { 'my_token' }

    # before do 
    #   allow(User::UserRepository).to receive(:new).and_return(user_repository)
    # end 


    describe '#show' do
      it 'has a route' do
        expect(get: 'api/user_detail/12').to route_to(
          controller: 'api/user_detail',
          action: 'show',
          format: 'json',
          id: '12'
        )
      end

      it 'returns a userdetail' do
        allow(Users::UserRepository).to receive(:new)
          .with(no_args).and_return(user_repository)
        allow(user_repository).to receive(:get_users_details).with('12', 'token').and_return(user)
        request.session[:token] = 'token'
        get :show, params: { id: '12' }
        expect(response.body).to eq user.to_json
      end
    end

    describe '#save_user' do
      it 'has a route' do
        expect(patch: 'api/user_detail/33/save_user').to route_to(
          format: 'json',
          controller: 'api/user_detail',
          action: 'save_user',
          id: '33',
        )
      end

      it 'updates a user' do
        allow(Users::UserRepository).to receive(:new).and_return(user_repository)
        allow(user_repository).to receive(:update_user)
          .with("55", {enabled: 'false', permissions: ['snapshot','hotline']}, token)
          .and_return(user)
        request.session[:token] = 'my_token'
        patch :save_user,  body: { enabled: 'false' },
          params: { id: 55, enabled: 'false', permissions: ['snapshot','hotline']}
        expect(response.body).to eq user.to_json
      end
    end
  end
end
