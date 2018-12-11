# frozen_string_literal: true

require 'acceptance_helper'
require 'feature'
require 'axe/rspec'

feature 'User Sign in' do
  scenario 'invalid login information throws an error message on the login screen' do
    cognito_invalid_login
    expect(page).to have_text('User does not exist.')
  end
  scenario 'invalid mfa code throws an error message on mfa screen' do
    cognito_login_with_invalid_mfa
    sleep 2
    expect(page)
      .to have_text('Error. You entered the wrong verification code, please try again.
      You have 2 attempts remaining.')
    invalid_mfa
    sleep 2
    expect(page)
      .to have_text('Error. You entered the wrong verification code, please try again.
      You have 1 attempt remaining.')
    invalid_mfa
    # redirects back to login screen
    expect(page).to have_text('Log In')
  end
end
