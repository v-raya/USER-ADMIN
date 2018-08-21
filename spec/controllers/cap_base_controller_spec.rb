# frozen_string_literal: true

require 'rspec'
require 'rails_helper'

describe CapBaseController do
  it 'logs out the user' do
    default_callback_url = ''
    allow(Infrastructure::SecurityGateway).to receive(:get_new_url)
      .with(default_callback_url, 'login')
      .and_return('www.example.com')
    allow(Infrastructure::SecurityGateway).to receive(:get_new_url)
      .with('www.example.com', 'logout')
      .and_return('www.example.com/login')
    get :logout
    assert_redirected_to 'www.example.com/login'
  end
end
