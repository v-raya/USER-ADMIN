# frozen_string_literal: true

require 'acceptance_helper'
require 'feature'
require 'axe/rspec'

feature 'User List Page' do
  scenario 'Can log in' do
    login
    page_has_user_list_headers
  end

  scenario 'has a list of users' do
    pending 'broken due to elastic search user data being mocked'
    login
    page_has_basic_text
    page_has_user_list_headers
    # expect(page).to be_accessible
    first_count = page_count_users

    expect(first_count).to be > 0

    user = first_user_link
    puts "user link: #{user.text}"

    user.click
    page_is_user_details
    # expect(page).to be_accessible

    puts "Will fail now if using elasticsearch mode and getting mock data. Can't view detail"
    click_on('Edit')
    # expect(page).to be_accessible
    find('.cancel').click
    page_is_user_details
  end

  scenario 'search limits the users returned' do
    # pending 'broken due to elastic search user data being mocked'
    login
    page_has_basic_text
    page_has_user_list_headers
    # expect(page).to be_accessible
    first_count = page_count_users
    puts "count users #{first_count}"
    user = first_user_link
    user2 = second_user_link

    puts "We have two links:  #{user.text} and #{user2.text}"

    search_users user2.text
    sleep 5 # Improve this when we add some visual identifier for when we're searching.
    second_count = page_count_users
    expect(second_count).to be < first_count
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

  def page_count_users
    page.all('.userRow').count
  end

  def first_user_link
    page.find('.table-striped').first('.userRow').first('td > a')
  end

  def second_user_link
    page.find('.table-striped').all('.userRow')[1].first('td > a')
  end

  def search_users(user_name)
    last_name = user_name.match(/([^,]*),/)[1]
    puts "search for #{last_name}"

    fill_in 'searchtext', with: last_name
    click_on 'Search'
  end
end
