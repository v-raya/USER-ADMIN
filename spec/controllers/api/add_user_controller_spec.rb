# frozen_string_literal: true

require 'rails_helper'

module Api
  describe AddUserController do
    describe '#index' do
      let(:user_repository) { instance_double('User::UserRepository') }
      let(:user) { Users::VerifyUser.new(username: 'el') }
      let(:token) { 'my_token' }
      let(:error_response) { 'My default error response' }

      it 'has a route' do
        expect(post: 'api/add_user').to route_to(
          controller: 'api/add_user',
          action: 'index',
          format: 'json'
        )
      end

      it 'adds a user' do
        allow(Users::UserRepository).to receive(:new).and_return(user_repository)
        allow(user_repository).to receive(:add_user)
          .with({ racfid: 'AA123PP',
                  email: 'verifyme@gmail.com' }, token)
          .and_return(user)
        request.session[:token] = 'my_token'
        post :index, params: { racfid: 'AA123PP',
                               email: 'verifyme@gmail.com' }
        expect(response.body).to eq user.to_json
      end

      it 'rescues an exception' do
        allow(Users::UserRepository).to receive(:new).and_raise(ApiError)
        request.session[:token] = 'my_token'
        post :index, params: { racfid: 'AA123PP',
                               email: 'verifyme@gmail.com' }
        expect(response.body).to eq error_response
      end
    end
  end
end
