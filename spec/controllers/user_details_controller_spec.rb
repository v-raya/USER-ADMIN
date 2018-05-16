# frozen_string_literal: true

require 'rails_helper'

describe UserDetailsController do
  describe '#index' do
    it 'has route' do
      expect(get: 'user_details/id')
        .to route_to(controller: 'user_details', id: 'id', action: 'index')
    end
  end
end
