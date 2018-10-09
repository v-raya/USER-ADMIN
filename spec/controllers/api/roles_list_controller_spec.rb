# frozen_string_literal: true

require 'rails_helper'

module Api
  describe RolesListController do
    describe '#index' do
      let(:user_repository) { instance_double('User::UserRepository') }
      let(:roles) { Users::Roles.new }

      it 'has a route' do
        expect(get: 'api/roles_list').to route_to(
          controller: 'api/roles_list',
          action: 'index',
          format: 'json'
        )
      end

      it 'returns roles list' do
        allow(Users::UserRepository).to receive(:new)
          .with(no_args).and_return(user_repository)
        allow(user_repository).to receive(:get_roles_list)
          .with('token').and_return(roles)
        request.session[:token] = 'token'
        get :index
        expect(response.body).to eq roles.to_json
      end
    end
  end
end
