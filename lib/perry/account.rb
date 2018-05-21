# frozen_string_literal: true

require 'dry-struct'
require 'dry-types'

module Types
  include Dry::Types.module
end

module Perry
  class Account < Dry::Struct
    constructor_type :schema
    attribute :user, Types::String.optional
    attribute :staff_id, Types::String
    attribute :first_name, Types::String.optional
    attribute :last_name, Types::String.optional
    attribute :county_code, Types::String.optional
    attribute :county_cws_code, Types::String.optional
    attribute :county_name, Types::String.optional
    attribute :roles, Types::Array.of(Types::String).optional
    attribute :privileges, Types::Array.of(Types::String).optional
  end
end
