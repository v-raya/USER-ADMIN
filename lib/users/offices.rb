# frozen_string_literal: true

require 'dry-struct'
require 'dry-types'

module Types
  include Dry::Types.module
end

module Users
  class Offices < Dry::Struct
    constructor_type :schema
    attribute :offices, Types::Array.optional
  end
end
