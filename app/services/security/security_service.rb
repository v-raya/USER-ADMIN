# frozen_string_literal: true

module Security
  class SecurityService
    def initialize(content = ContentStore.content)
      @content = content
    end

    def check_permission?(account)
      permitted?(@content['permitted_roles'], account)
    end

    def permitted?(permitted_roles, account)
      permitted_roles.blank? || !(account.roles & permitted_roles).empty?
    end
  end
end
