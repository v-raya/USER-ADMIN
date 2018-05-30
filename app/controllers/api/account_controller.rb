# frozen_string_literal: true

module Api
  class AccountController < ActionController::API
    def index
      token = session[:token]
      account = Perry::AccountService.new.get_perry_account(token)
      render json: account
    end
  end
end
