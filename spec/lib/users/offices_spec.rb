# frozen_string_literal: true

require 'spec_helper'
require 'rspec/dry/struct'

module Users
  describe Offices do
    describe 'attributes' do
      subject { Offices }
      it { is_expected.to have_attribute(:offices, Types::Array.optional) }
    end
  end
end
