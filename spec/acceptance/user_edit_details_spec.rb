# frozen_string_literal: true

require 'acceptance_helper'
require 'feature'
require 'axe/rspec'

feature 'User Edit' do
  scenario 'Can log in' do
    login
  end

  scenario 'user_details view of inaccessible or missing user shows "User not found"' do
    login
    page_has_user_list_headers
    search_users(last_name: '', include_inactive: true)
    sleep 2
    first_user_url = first_user_link[:href]
    visit "#{first_user_url}BAD_EXTRA_CHARS"
    page_is_user_details
    expect(page).to have_content('User not found')
    click_on 'User List'
  end

  scenario 'user_details edit/save is accessibile' do
    login
    page_has_user_list_headers
    sleep 2
    first_user_link.click

    pending 'add user validation has accessibility issues'
    check_accessibility
    page_is_user_details
    click_on('Edit')
    check_accessibility
  end

  scenario 'user_details edit/save successfully' do
    login
    page_has_user_list_headers
    search_users(last_name: '', include_inactive: true)
    sleep 2
    user_name = first_user_link.text
    first_user_link.click
    page_is_user_details

    original_account_status = detail_page_value('Account Status')

    click_on('Edit')

    new_status = (original_account_status == 'Active' ? 'Inactive' : 'Active')
    expect(detail_page_value('Full Name')).to eq user_name
    sleep 5 # wait for things to load?

    expect(page).to have_button('save', disabled: true)
    expect(page).to have_button('Cancel', disabled: false)

    original_selected_permissions = selected_permissions
    one_permission = original_selected_permissions.last
    one_permission = '' if one_permission == 'Select...'

    # Edit both modifiable fields
    change_status new_status
    remove_permission(one_permission)
    new_selected_permissions = selected_permissions

    # the last one should be gone now.
    expected_remainder = selected_permissions.first(original_selected_permissions.size - 1)
    # Expect a message about selecting permissions to show up id we don't have any
    expected_remainder = ['Select...'] if expected_remainder.empty?

    expect(new_selected_permissions).to eq(expected_remainder)

    click_button 'save'
    expect_success

    # status has changed to new status
    expect(details_account_status)
      .to eq(new_status)
    # permissions has changed to new permissions

    # xpath fails to find the span following the label if it's empty.
    # Find the parent div instead and parse...
    string_permissions = find(:xpath, "//label[contains(text(),'Assigned Permissions')]/..")
                         .text.split('Assigned Permissions').last.to_s.strip
    expect(string_permissions)
      .to eq(original_selected_permissions.first(original_selected_permissions.size - 1)
           .join(', '))

    # put it back
    click_on('Edit')
    sleep 5 # wait for things to load
    change_status original_account_status

    # Add in a real permission to test that we can add one to an empty list, if that's what we have.
    if one_permission.blank?
      one_permission = 'Hotline'
      original_selected_permissions = ['Hotline']
    end
    add_permission(one_permission)

    click_button 'save'

    expect_success
    expect(details_account_status)
      .to eq(original_account_status)

    expect(find(:xpath,
                "//label[contains(text(),'Assigned Permissions')]/following-sibling::span").text)
      .to eq(original_selected_permissions.join(', '))
    # find('#react-select-5--value').click
    # find('#react-select-5--option-1').click

    click_link 'User List'
    page_has_user_list_headers
  end

  scenario 'user_details edit/save email successfully' do
    login
    page_has_user_list_headers
    sleep 2
    first_user_link.click
    page_is_user_details

    original_email_address = detail_page_value('Email')

    click_on('Edit')
    expect(page).to have_button('save', disabled: true)
    expect(page).to have_button('Cancel', disabled: false)
    fill_in('Email', with: 'cwds3raval', match: :prefer_exact)
    # bad email address won't let us proceed
    expect(page).to have_button('save', disabled: true)
    expect(page).to have_content('Please enter a valid email')

    # correct the email to a proper address
    email_address = new_email_address
    fill_in('Email', with: email_address, match: :prefer_exact)
    expect(page).to have_button('save', disabled: false)
    # put back the original email address
    fill_in('Email', with: original_email_address, match: :prefer_exact)
    expect(page).to have_button('save', disabled: false)

    click_button 'save'
    expect_success

    click_link 'User List'
    page_has_user_list_headers
  end

  scenario 'if user is confirmed there is no resend invite button' do
    login
    page_has_user_list_headers

    search_users(last_name: 'Auto', include_inactive: true)

    sleep 2
    first_user_name = get_user_link(0).text

    get_user_link(0).click

    sleep 5
    expect(detail_page_value('Full Name')).to eq(first_user_name)

    page_is_user_details

    expect(detail_page_value('User Status'))
      .to eq('Confirmed User has been confirmed.')

    click_on('Edit')

    expect(page).to have_no_button('Resend Invite')
  end
end
