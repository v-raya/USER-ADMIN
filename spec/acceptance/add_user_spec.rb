# frozen_string_literal: true

require 'acceptance_helper'
require 'feature'
require 'axe/rspec'

feature 'Add User Page' do
  scenario 'entering valid info and completing the add' do
    login
    page_has_user_list_headers
    # Make sure there's no active existing user

    deactivate_any_active_added_user

    click_button '+ Add a user'

    email_address = new_email_address
    fill_in('Email', with: new_email_address, match: :prefer_exact)

    # now enter a valid RACFID valid
    valid_racfid = 'AUTO1I'
    fill_in('CWS Login', with: valid_racfid, match: :prefer_exact)
    click_button 'Verify User'
    wait_for_loading_to_complete

    expect(page).not_to have_selector('.alert-message')

    # we are now cleared to add the user.

    expect(page).to have_button('Add User')

    click_button 'Add User'
    page.find('div.success-message')
    expect(find(:label, 'CWS Login').find(:xpath, './/../span').text).to eq valid_racfid

    message = "Successfully added new user. Registration email has been sent to #{email_address}"
    expect(page.find('div.success-message').text).to eq(message)

    # Should be able to click the 'edit' button now, but the test becomes unstable in our
    # environments.
    # Instead, capture the new user's detail page URL and revisit.
    new_user_detail_page = current_url
    click_link 'User List'
    visit new_user_detail_page
    expect(page).to have_button('Edit')

    # Deactivate this user so we can add him again using this process next time
    page.click_button 'Edit'

    click_on('Resend Invite')

    date_time = Time.now.strftime('%B %d, %Y %I:%M %p')

    resend_registration_email_success

    expect(detail_page_value('User Status'))
      .to have_text("Registration Incomplete User has never logged in. Registration email resent:
      #{date_time} ")

    change_status 'Inactive'
    click_button 'save'
  end

  scenario 'add user page is accessible' do
    pending 'add user validation has accessibility issues'
    login
    deactivate_any_active_added_user
    page_has_user_list_headers
    click_button '+ Add a user'

    fill_in('Email', with: new_email_address, match: :prefer_exact)

    # now enter a valid RACFID valid
    valid_racfid = 'AUTO1I'
    fill_in('CWS Login', with: valid_racfid, match: :prefer_exact)

    check_accessibility
    click_button 'Verify User'
    wait_for_loading_to_complete
    check_accessibility
  end

  scenario 'entering invalid info and fixing it as we go' do
    login
    page_has_user_list_headers
    deactivate_any_active_added_user
    click_button '+ Add a user'

    expect(page).to have_content('Add User')
    expect(page).to have_content('Verify User')

    expect(page).to have_content('Enter the CWS Login and email address of the user ')
    expect(page).to have_button('Verify User', disabled: true)

    not_found_racfid = 'CWS_NOT_FOUND_RACFID'
    fill_in('CWS Login', with: not_found_racfid, match: :prefer_exact)
    fill_in('Email', with: 'cwds3raval', match: :prefer_exact)

    # bad email address won't let us proceed
    expect(page).to have_button('Verify User', disabled: true)
    expect(page).to have_content('Please enter a valid email.')

    # correct the email to a proper address
    email_address = new_email_address
    fill_in('Email', with: email_address, match: :prefer_exact)
    expect(page).to have_button('Verify User', disabled: false)

    click_button 'Verify User'
    puts "### No active user with CWS Login: #{not_found_racfid} was found in CWS/CMS"
    expect(page).to have_content('No active user with CWS Login')
    # debugging:  this is a list of known racfids.  Some may be valid for our county, or not.
    # Keep this list around for future debugging purposes becsause the data is volatile.
    # find a racfid demonstrating wrong county:
    # ids %w[RUBBLBA CWSPC CWDST ELZIELA USERTF CWDS4 SMITHJP CAPPIR DEMUNP CWDS9 STEVEI CWDS3
    # TESTIB CWDS8 CWDS0 RUBBLB FLINTF GIDEOJ KONSI CHRISI TESTCC TESTCD CWDS2 CWSPD TESTPA SRINII
    # CHOUGA CWDS7 PADMAS TESTPC SCOGGMA CWDS5 GIDEOJA TAYLOVA HELPAA YEEI FAGUNBA CWDS6 LEGACT SIMK
    # CWDS1 YULLC TESTCE]
    #  ids.each do |id|
    # end

    click_button 'Verify User'

    unauthorized_racfid = 'AUTO1IA'
    fill_in('CWS Login', with: unauthorized_racfid, match: :prefer_exact)
    click_button 'Verify User'
    wait_for_loading_to_fail('You cannot add this user because they exist in Madera county.')

    # now enter a valid RACFID valid
    valid_racfid = 'AUTO1I'
    fill_in('CWS Login', with: valid_racfid, match: :prefer_exact)
    click_button 'Verify User'
    wait_for_loading_to_complete
    expect(page).to have_button('Add User')
    # We could click on the Add User button but then we'd have added the user.
    click_link 'User List'
    page_has_user_list_headers
  end
end
