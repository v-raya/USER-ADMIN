# frozen_string_literal: true

module Api
  class ResendRegistrationEmailController < ActionController::API
    def index
      resend_registration_email =
        Users::UserRepository.new.resend_registration_email(
          params.permit(:id).to_h,
          session[:token]
        )
      render json: resend_registration_email
    end
  end
end
