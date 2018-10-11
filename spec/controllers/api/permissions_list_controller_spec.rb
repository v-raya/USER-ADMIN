# frozen_string_literal: true

require 'rails_helper'

module Api
  describe PermissionsListController do
    describe '#index' do
      let(:user_repository) { instance_double('User::UserRepository') }
      let(:permissions) { Users::Permissions.new }

      it 'has a route' do
        expect(get: 'api/permissions_list').to route_to(
          controller: 'api/permissions_list',
          action: 'index',
          format: 'json'
        )
      end

      describe 'with a valid request' do
        before do
          allow(Users::UserRepository).to receive(:new)
            .with(no_args).and_return(user_repository)
          allow(user_repository).to receive(:get_permissions_list)
            .with('token').and_return(permissions)
          request.session[:token] = 'token'
          get :index
        end
        it 'returns permissions list' do
          expect(response.body).to eq permissions.to_json
        end
        it 'responds successfully' do
          expect(response.status).to eq 200
        end
      end
    end
  end
end
