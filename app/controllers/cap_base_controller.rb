# frozen_string_literal: true

class CapBaseController < ApplicationController
  def logout
    delete_user_from_session
    default_callback_url = ''
    login_url =  Infrastructure::SecurityGateway.get_new_url(default_callback_url, 'login')
    redirect_to  Infrastructure::SecurityGateway.get_new_url(login_url, 'logout')
  end

  private

  def require_roles(method)
    if check_for_roles?
      method
    else
      render 'errors/forbidden_page'
    end
  end

  def delete_user_from_session
    session.clear
  end

  def check_for_roles?
    token = session[:token]
    account = Perry::AccountService.new.get_perry_account(token)
    Security::SecurityService.new.check_permission?(account)
  end
end
