# frozen_string_literal: true

require 'spec_helper'
require 'rspec/dry/struct'

module Users
  describe User do
    describe 'attributes' do
      subject { User }
      it { is_expected.to have_attribute(:username, Types::String.optional) }
      it { is_expected.to have_attribute(:id, Types::String.optional) }
      it { is_expected.to have_attribute(:first_name, Types::String.optional) }
      it { is_expected.to have_attribute(:last_name, Types::String.optional) }
      it { is_expected.to have_attribute(:county_name, Types::String.optional) }
      it { is_expected.to have_attribute(:racfid, Types::String.optional) }
      it { is_expected.to have_attribute(:start_date, Types::String.optional) }
      it { is_expected.to have_attribute(:end_date, Types::String.optional) }
      it { is_expected.to have_attribute(:office, Types::String.optional) }
      it { is_expected.to have_attribute(:phone_number, Types::String.optional) }
      it { is_expected.to have_attribute(:email, Types::String.optional) }
      it { is_expected.to have_attribute(:user_create_date, Types::String.optional) }
      it { is_expected.to have_attribute(:user_last_modified_date, Types::String.optional) }
      it { is_expected.to have_attribute(:last_login_date_time, Types::String.optional) }
      it { is_expected.to have_attribute(:enabled, Types::Bool.optional) }
      it { is_expected.to have_attribute(:status, Types::String.optional) }
      it { is_expected.to have_attribute(:permissions, Types::Array.optional) }
      it { is_expected.to have_attribute(:verification_passed, Types::Bool.optional) }
      it { is_expected.to have_attribute(:verification_message, Types::String.optional) }
    end

    describe 'search' do
      let(:search_server) { Infrastructure::HttpService.new('http://stub.example.com') }
      let(:good_response) { double(body: 'content') }
      let(:token) { 'token' }
      before do
        allow(search_server).to receive(:post).with('/dora/users/user/_search', 'my query', token)
                                              .and_return(good_response)
        allow(Infrastructure::HttpService).to receive(:new).with('https://dora.test')
                                                           .and_return(search_server)
      end
      it 'posts the given token to a search service' do
        expect(User.search('my query', 'token')).to eq('content')
      end
    end
  end
end
