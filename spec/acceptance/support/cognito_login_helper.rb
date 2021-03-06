# frozen_string_literal: true

module CognitoLoginHelper
  def login
    visit ENV.fetch('RAILS_RELATIVE_URL_ROOT', '/')
    return unless current_url.include?('login')

    fill_in 'username', with: ENV.fetch('COGNITO_USERNAME', 'no-reply@osi.ca.gov')
    fill_in 'password', with: ENV.fetch('COGNITO_PASSWORD', 'password')
    submit_btn = find('input[type="Submit"]')
    submit_btn.click
  end
end
