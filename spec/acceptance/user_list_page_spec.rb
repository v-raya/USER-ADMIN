# frozen_string_literal: true

require 'acceptance_helper'
require 'feature'
require 'axe/rspec'

feature 'User List Page' do
  scenario 'Can log in' do
    visit ENV['RAILS_RELATIVE_URL_ROOT'] || '/'
    login
  end

  scenario 'page is accessible' do
    pending 'page has accessibility issues'
    login
    check_accessibility
  end

  scenario 'validate user list page' do
    login
    sleep 2
    page_has_basic_text
    page_has_user_list_headers
    first_count = page_count_users
    expect(first_count).to be > 0
    puts "count users #{first_count}"

    user1 = first_user_link
    user2 = second_user_link

    puts "We have two links:  #{user1.text} and #{user2.text}"

    search_users user2.text
    # FUTURE  we have no visible indicaor that the search finished.
    # If we don't wait the list of users on the page may fail because
    # it is still changing users
    sleep 2
    expect_sorted_list(users_on_page)
    second_count = page_count_users

    expect(second_count).to be < first_count
    puts "count users #{second_count}"
  end
end
