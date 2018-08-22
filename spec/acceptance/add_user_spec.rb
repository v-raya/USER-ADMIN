# frozen_string_literal: true

require 'acceptance_helper'
require 'feature'
require 'axe/rspec'
require 'pry'

feature 'Add User Page' do
  scenario 'entering invalid info and fixing it as we go' do
    login
    page_has_user_list_headers
    click_button '+ Add a user'

    # correct the email to a proper address
    email_address = new_email_address
    fill_in('Email', with: new_email_address, match: :prefer_exact)

    # now enter a valid RACFID valid
    valid_racfid = 'BKQA2'
    fill_in('CWS Login', with: valid_racfid, match: :prefer_exact)
    click_button 'Verify User'

    # we are now cleared to add the user.
    expect(page).to have_button('Add User')
    # We could click on the Add User button but then we'd have added the user.
    click_button 'Add User'
    message = "Successfully added new user. Registration email has been sent to #{email_address}"
    expect(page.find('div.success-message').text).to match(message)
  end

  scenario 'entering invalid info and fixing it as we go' do
    login
    page_has_user_list_headers
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
    expect(page).to have_content("No user with CWS Login: #{not_found_racfid} is found in CWS/CMS")

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
    unauthorized_racfid = 'CWDS4'
    fill_in('CWS Login', with: unauthorized_racfid, match: :prefer_exact)
    click_button 'Verify User'
    expect(page).to \
      have_content('You are not authorized to add users from Counties other than your own')

    # now enter a valid RACFID valid
    valid_racfid = 'BKQA2'
    fill_in('CWS Login', with: valid_racfid, match: :prefer_exact)
    click_button 'Verify User'

    # we are now cleared to add the user.
    expect(page).to have_button('Add User')
    # We could click on the Add User button but then we'd have added the user.
    click_link 'User List'
    page_has_user_list_headers
  end
end
