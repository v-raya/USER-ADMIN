# frozen_string_literal: true

require 'dry-struct'
require 'users/types'

module Users
  class Permissions < Dry::Struct
    constructor_type :schema
    attribute :permissions, Types::Array.optional
  end
end
