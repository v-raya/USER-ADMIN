# frozen_string_literal: true

require 'spec_helper'
require 'rspec/dry/struct'

module Users
  describe EditDetails do
    describe 'attributes' do
      subject { EditDetails }
      it { is_expected.to have_attribute(:editable, Types::String.optional) }
    end
  end
end
