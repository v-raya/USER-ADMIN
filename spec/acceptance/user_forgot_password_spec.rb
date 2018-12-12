# frozen_string_literal: true

require 'acceptance_helper'
require 'feature'
require 'axe/rspec'

feature 'User Forgot Password Page' do
  before(:all) do
    logout_link
  end
  scenario 'click on forgot password link and submit email for resetting password' do
    click_forgot_password_link
    expect(page).to have_text('Password Reset')
    reset_password
    expect(page).to have_text('Please check your email.')
  end

  scenario 'cancel from email submit page' do
    click_forgot_password_link
    expect(page).to have_text('Password Reset')
    click_button 'Cancel'
    expect(page).to have_text 'Log In'
  end

  scenario 'cancel from reset password page' do
    click_forgot_password_link
    expect(page).to have_text('Password Reset')
    reset_password
    expect(page).to have_text('Please check your email.')
    click_button 'Cancel - Return to Login'
    expect(page).to have_text 'Log In'
  end

  scenario 'submit your email page has accessibility issues' do
    pending 'submit your email from forgot password has accessibility issues'
    click_forgot_password_link
    expect(page).to have_text('Password Reset')
    check_accessibility
  end

  scenario 'reset your password page has accessibility issues' do
    pending 'reset your password has accessibility issues'
    click_forgot_password_link
    expect(page).to have_text('Password Reset')
    reset_password
    expect(page).to have_text('Please check your email.')
    check_accessibility
  end
end
