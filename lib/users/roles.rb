# frozen_string_literal: true

require 'dry-struct'
require 'users/types'

module Users
  class Roles < Dry::Struct
    constructor_type :schema
    attribute :editable, Types::String.optional
    attribute :possible_values, Types::Array.optional
  end
end
