# frozen_string_literal: true

require 'spec_helper'
require 'rspec/dry/struct'

module Users
  describe Roles do
    describe 'attributes' do
      subject { Roles }
      it { is_expected.to have_attribute(:roles, Types::Array.optional) }
    end
  end
end
