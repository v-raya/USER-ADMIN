# frozen_string_literal: true

require 'rails_helper'

module Api
  describe UserDetailController do
    describe '#show' do
      let(:user_repository) { instance_double('User::UserRepository') }
      let(:user) { Users::User.new(username: 'el') }

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
  end
end
