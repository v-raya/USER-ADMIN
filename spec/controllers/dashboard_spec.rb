# frozen_string_literal: true

require 'rails_helper'

describe DashboardController do
  describe '#index' do
    it 'has route' do
      expect(get: '/').to route_to(controller: 'dashboard', action: 'index')
    end

    it 'renders a template' do
      allow_any_instance_of(DashboardController).to receive(:check_for_roles?).and_return(true)
      get :index
      expect(response).to render_template 'index'
    end

    it 'renders a error page' do
      allow_any_instance_of(DashboardController).to receive(:check_for_roles?).and_return(false)
      get :index
      expect(response).to render_template 'errors/forbidden_page'
    end

    it 'is the "catch all" route' do
      expect(get: '/does-not-exist').to route_to(controller: 'dashboard',
                                                 action: 'index',
                                                 path: 'does-not-exist')
    end
  end
end
