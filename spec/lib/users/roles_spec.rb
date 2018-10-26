# frozen_string_literal: true

require 'spec_helper'
require 'rspec/dry/struct'

module Users
  describe Roles do
    describe 'attributes' do
      subject { Roles }
      it { is_expected.to have_attribute(:editable, Types::String.optional) }
      it { is_expected.to have_attribute(:possible_values, Types::Array.optional) }
    end
  end
end
