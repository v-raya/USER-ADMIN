# frozen_string_literal: true

require 'spec_helper'
require 'rspec/dry/struct'

module Users
  describe Permissions do
    describe 'attributes' do
      subject { Permissions }
      it { is_expected.to have_attribute(:editable, Types::String.optional) }
      it { is_expected.to have_attribute(:possible_values, Types::Array.optional) }
    end
  end
end
