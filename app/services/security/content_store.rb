# frozen_string_literal: true

module Security
  # path connecting to security.yml
  class ContentStore
    @path = 'config/security.yml'
    @content = false

    attr_writer :age

    class << self
      attr_reader :path
    end

    def self.content
      YAML.load_file(path)
    end
  end
end
