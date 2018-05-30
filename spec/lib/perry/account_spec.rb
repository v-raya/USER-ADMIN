# frozen_string_literal: true

require 'spec_helper'
require 'rspec/dry/struct'

module Perry
  describe Account do
    describe 'attributes' do
      subject { Account }
      it { is_expected.to have_attribute(:user, Types::String.optional) }
      it { is_expected.to have_attribute(:staff_id, Types::String) }
      it { is_expected.to have_attribute(:first_name, Types::String.optional) }
      it { is_expected.to have_attribute(:last_name, Types::String.optional) }
      it { is_expected.to have_attribute(:county_code, Types::String.optional) }
      it { is_expected.to have_attribute(:county_cws_code, Types::String.optional) }
      it { is_expected.to have_attribute(:county_name, Types::String.optional) }
      it { is_expected.to have_attribute(:roles, Types::Array.of(Types::String).optional) }
      it { is_expected.to have_attribute(:privileges, Types::Array.of(Types::String).optional) }
    end
  end
end
