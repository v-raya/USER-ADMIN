# frozen_string_literal: true

require 'rails_helper'

module Api
  describe OfficesListController do
    describe '#index' do
      let(:user_repository) { instance_double('User::UserRepository') }
      let(:offices) { Users::Offices.new }

      it 'has a route' do
        expect(get: 'api/offices_list').to route_to(
          controller: 'api/offices_list',
          action: 'index',
          format: 'json'
        )
      end

      it 'returns offices list' do
        allow(Users::UserRepository).to receive(:new)
          .with(no_args).and_return(user_repository)
        allow(user_repository).to receive(:get_offices_list)
          .with('token').and_return(offices)
        request.session[:token] = 'token'
        get :index
        expect(response.body).to eq offices.to_json
      end
    end
  end
end
