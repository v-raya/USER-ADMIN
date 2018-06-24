# frozen_string_literal: true

require 'acceptance_helper'
require 'feature'
require 'axe/rspec'

feature 'User List Page' do
  scenario 'has a list of users' do
    # pending 'broken due to not finding the app server within the test bubble'
    login
    page_has_basic_text
    page_has_user_list_headers
    # expect(page).to be_accessible
    page_has_users

    user = first_user_link
    puts "user link: #{user.text}"
    user.click
    page_is_user_details
    # expect(page).to be_accessible

    click_on('Edit')
    # expect(page).to be_accessible
    find('.cancel').click
    page_is_user_details

    # binding.pry
    click_link('User List')
    page_has_user_list_headers
    page_has_users
  end

  def page_has_basic_text
    expect(page).to have_content('Manage Users:')
  end

  def page_has_user_list_headers
    expect(page).to have_content('Status')
  end

  def page_is_user_details
    expect(page).to have_content('User Profile')
  end

  def page_has_users
    expect(page).to have_css('.userRow')
    page.first('.userRow')
  end

  def first_user_link
    page.find('.table-striped').first('.userRow').first('td > a')
  end
end
