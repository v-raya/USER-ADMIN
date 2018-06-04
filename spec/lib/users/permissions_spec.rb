# frozen_string_literal: true

require 'spec_helper'
require 'rspec/dry/struct'

module Users
  describe Permissions do
    describe 'attributes' do
      subject { Permissions }
      it { is_expected.to have_attribute(:permissions, Types::Array.optional) }
    end
  end
end
