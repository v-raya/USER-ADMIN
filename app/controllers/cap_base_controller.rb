# frozen_string_literal: true

class CapBaseController < ApplicationController
  private

  def require_roles(method)
    if check_for_roles?
      method
    else
      render 'errors/forbidden_page'
    end
  end

  def check_for_roles?
    token = session[:token]
    account = Perry::AccountService.new.get_perry_account(token)
    Security::SecurityService.new.check_permission?(account)
  end
end
