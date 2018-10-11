# frozen_string_literal: true

require 'dry-struct'
require 'users/types'

module Users
  class UserData < Dry::Struct
    constructor_type :schema
    attribute :user, Types::Object.optional
    attribute :county_name, Types::String.optional
    attribute :email, Types::String.optional
    attribute :enabled, Types::String.optional
    attribute :end_date, Types::String.optional
    attribute :first_name, Types::String.optional
    attribute :id, Types::String.optional
    attribute :last_login_date_time, Types::String.optional
    attribute :last_name, Types::String.optional
    attribute :office_id, Types::String.optional
    attribute :permissions, Types::Array.optional
    attribute :phone_extension_number, Types::String.optional
    attribute :phone_number, Types::String.optional
    attribute :racfid, Types::String.optional
    attribute :start_date, Types::String.optional
    attribute :status, Types::String.optional
    attribute :user_create_date, Types::String.optional
    attribute :user_last_modified_date, Types::String.optional
    attribute :roles, Types::Array.optional
  end
end
