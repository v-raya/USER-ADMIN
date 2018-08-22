# frozen_string_literal: true

require 'acceptance_helper'
require 'feature'
require 'axe/rspec'

feature 'User List Page' do
  scenario 'Can log in' do
    login
  end

  scenario 'user_details edit/save' do
    login
    page_has_user_list_headers
    first_user_link.click
    page_is_user_details

    click_on('Edit')
    find('.cancel').click
    page_is_user_details
    click_link 'User List'
    page_has_user_list_headers
    first_user_link.click
    page_is_user_details

    original_status = find(:xpath,
                           "//label[contains(text(),'Status')]/following-sibling::span").text
    new_status = (original_status == 'Active' ? 'Inactive' : 'Active')

    click_on('Edit')
    page_is_user_details
    expect(page).to have_button('save', disabled: true)
    expect(page).to have_button('Cancel', disabled: false)

    original_selected_permissions = selected_permissions
    one_permission = original_selected_permissions.last

    # Edit both modifiable fields
    change_status new_status
    remove_permission(one_permission)
    new_selected_permissions = selected_permissions

    # the last one should be gone now.
    expected_remainder = selected_permissions.first(original_selected_permissions.size - 1)
    expect(new_selected_permissions).to eq(expected_remainder)

    click_button 'save'
    expect_success

    # status has changed to new status
    expect(find(:xpath,
                "//label[contains(text(),'Status')]/following-sibling::span").text)
      .to eq(new_status)
    # permissions has changed to new permissions
    expect(find(:xpath,
                "//label[contains(text(),'Permissions')]/following-sibling::span").text)
      .to eq(original_selected_permissions.first(original_selected_permissions.size - 1)
               .join(', '))

    # put it back
    click_on('Edit')
    change_status original_status
    add_permission(one_permission)

    click_button 'save'

    expect_success
    expect(find(:xpath,
                "//label[contains(text(),'Status')]/following-sibling::span").text)
      .to eq(original_status)

    # find('#react-select-5--value').click
    # find('#react-select-5--option-1').click

    click_link 'User List'
    page_has_user_list_headers
  end
end
