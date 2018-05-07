# frozen_string_literal: true

require 'acceptance_helper'
require 'feature'

feature 'User List Page' do
  scenario 'has a list of users' do
    pending 'the user list page has not yet been created'
    login
    page_has_basic_text
    page_has_user_list_headers
  end

  def page_has_basic_text
    expect(page).to have_content('Manage Users:')
  end

  def page_has_user_list_headers
    expect(page).to have_content('Status')
  end
end
