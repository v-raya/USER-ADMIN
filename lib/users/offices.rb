# frozen_string_literal: true

require 'dry-struct'
require 'users/types'

module Users
  class Offices < Dry::Struct
    constructor_type :schema
    attribute :offices, Types::Array.optional
  end
end
