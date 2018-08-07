# frozen_string_literal: true

require 'spec_helper'
require 'rspec/dry/struct'

module Users
  describe VerifyUser do
    describe 'attributes' do
      subject { VerifyUser }
      it { is_expected.to have_attribute(:date, Types::String.optional) }
      it { is_expected.to have_attribute(:expires, Types::String.optional) }
      it { is_expected.to have_attribute(:location, Types::String.optional) }
      it { is_expected.to have_attribute(:pragma, Types::String.optional) }
      it { is_expected.to have_attribute(:error_code, Types::String.optional) }
      it { is_expected.to have_attribute(:verification_passed, Types::Bool.optional) }
      it { is_expected.to have_attribute(:verification_message, Types::String.optional) }
    end
  end
end
