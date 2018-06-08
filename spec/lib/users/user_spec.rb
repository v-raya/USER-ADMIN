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
      it { is_expected.to have_attribute(:RACFID, Types::String.optional) }
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
    end
  end
end
