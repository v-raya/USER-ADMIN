# frozen_string_literal: true

require 'dry-struct'
require 'dry-types'

module Types
  include Dry::Types.module
end

module Users
  class User < Dry::Struct
    constructor_type :schema
    attribute :editable, Types::String.optional
    attribute :roles, Types::String.optional
    attribute :user, UserDetails
  end
end
