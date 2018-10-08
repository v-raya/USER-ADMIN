# frozen_string_literal: true

require 'dry-struct'
require 'dry-types'

module Types
  include Dry::Types.module
end

module Users
  class VerifyUser < Dry::Struct
    constructor_type :schema
    attribute :date, Types::String.optional
    attribute :expires, Types::String.optional
    attribute :location, Types::String.optional
    attribute :pragma, Types::String.optional
    attribute :error_code, Types::String.optional
    attribute :verification_passed, Types::Bool.optional
    attribute :verification_message, Types::String.optional
    attribute :user, UserData
  end
end
