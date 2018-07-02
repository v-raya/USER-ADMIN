# frozen_string_literal: true

require 'rails_helper'

module Api
  describe CreateUserController do
    describe '#index' do
      let(:user_repository) { instance_double('User::UserRepository') }
      let(:user) { Users::VerifyUser.new(username: 'el') }
      let(:token) { 'my_token' }
      user_params = {
        enable: 'true',
        permissions: %w[snapshot hotline]
     } 

                                #  params: {
                                #     first_name: 'First Name',
                                #     last_name: 'Last Name',
                                #     enabled: 'false',
                                #     county_name: 'Madera',
                                #     office: 'My_office',
                                #     phone_number: '4567898764',
                                #     permissions: %w[snapshot hotline] }

      it 'has a route' do
        expect(post: 'api/create_user').to route_to(
          controller: 'api/create_user',
          action: 'index',
          format: 'json'
        )
      end

      it 'create user' do
        allow(Users::UserRepository).to receive(:new).and_return(user_repository)
        allow(user_repository).to receive(:create_user)
          .with({ racfid: 'AA123PP',
                  email: 'verifyme@gmail.com' }, token)
          .and_return(user)
        request.session[:token] = 'my_token'
        post :index, params: { racfid: 'AA123PP',
                              email: 'verifyme@gmail.com' }
        expect(response.body).to eq user.to_json
      end
    end
  end
end
