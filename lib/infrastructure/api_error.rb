# frozen_string_literal: true

class ApiError < StandardError
  attr_reader :status
  attr_reader :response

  def initialize(response = 'My default error response', status = 200)
    @status = status
    @response = response
  end
end
