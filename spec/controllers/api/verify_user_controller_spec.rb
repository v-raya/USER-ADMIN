# frozen_string_literal: true

require 'rails_helper'

module Api
  describe VerifyUserController do
    describe '#index' do
      let(:user_repository) { instance_double('User::UserRepository') }
      let(:user) { Users::User.new(username: 'el') }
      let(:token) { 'my_token' }
      let(:error_response) { 'My default error response' }
      it 'has a route' do
        expect(get: 'api/verify_user').to route_to(
          controller: 'api/verify_user',
          action: 'index',
          format: 'json'
        )
      end

      it 'verifies user' do
        allow(Users::UserRepository).to receive(:new).and_return(user_repository)
        allow(user_repository).to receive(:verify_user)
          .with({ racfid: 'AA123PP',
                  email: 'verifyme@gmail.com' }, token)
          .and_return(user)
        request.session[:token] = 'my_token'
        get :index, params: { racfid: 'AA123PP',
                              email: 'verifyme@gmail.com' }
        expect(response.body).to eq user.to_json
      end

      it 'rescues an exception' do
        allow(Users::UserRepository).to receive(:new).and_raise(ApiError)
        request.session[:token] = 'my_token'
        get :index, params: { racfid: 'AA123PP',
                              email: 'verifyme@gmail.com' }
        expect(response.body).to eq error_response
      end
    end
  end
end
