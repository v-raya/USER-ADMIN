# frozen_string_literal: true

require 'dry-struct'
require 'users/types'

module Users
  class EditDetails < Dry::Struct
    constructor_type :schema
    attribute :editable, Types::String.optional
    attribute :roles, Roles
    attribute :permissions, Permissions
  end
end
