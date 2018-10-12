# frozen_string_literal: true

require 'rails_helper'

module Api
  describe ResendRegistrationEmailController do
    let(:user_repository) { instance_double('User::UserRepository') }
    let(:token) { 'my_token' }

    describe '#index' do
      it 'has a route' do
        expect(get: 'api/resend_registration_email').to route_to(
          controller: 'api/resend_registration_email',
          action: 'index',
          format: 'json',
        )
      end

      it 'returns a status 200 on success' do
        allow(Users::UserRepository).to receive(:new)
        .with(no_args).and_return(user_repository)
        allow(user_repository).to receive(:resend_registration_email)
        .with({ 'email' => 'no-reply@osi.ca.gov' }, 'token').and_return(200)
        request.session[:token] = 'token'
        get :index, params: { email: 'no-reply@osi.ca.gov' }
        expect(response.body).to eq '200'
      end

      it 'returns a status 404 on failure' do
        allow(Users::UserRepository).to receive(:new)
        .with(no_args).and_return(user_repository)
        allow(user_repository).to receive(:resend_registration_email)
        .with({ 'email' => 'no-reply@osi.ca.gov' }, 'token').and_return(404)
        request.session[:token] = 'token'
        get :index, params: { email: 'no-reply@osi.ca.gov' }
        expect(response.body).to eq '404'
      end
    end
  end
end
