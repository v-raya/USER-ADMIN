# frozen_string_literal: true

require 'dry-struct'
require 'dry-types'

module Types
  include Dry::Types.module
end

module Users
  class Permissions < Dry::Struct
    constructor_type :schema
    attribute :permissions, Types::Array.optional
  end
end
