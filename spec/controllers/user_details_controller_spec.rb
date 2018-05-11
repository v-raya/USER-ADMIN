# frozen_string_literal: true

require 'rails_helper'

describe UserDetailsController do
  describe '#index' do
    it 'has route' do
      expect(get: 'user_details').to route_to(controller: 'user_details', action: 'index')
    end
  end
end
