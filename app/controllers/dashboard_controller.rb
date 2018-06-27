# frozen_string_literal: true

class DashboardController < CapBaseController
  before_action -> { require_roles(method(:index)) }
  def index; end
end
