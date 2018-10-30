# frozen_string_literal: true

module UserDetailPageHelper
  def page_is_user_details
    # find forces a wait for the content to appear, while the expect does not.
    find('h1', text: 'User Profile')
    expect(page).to have_content('User Profile')
  end

  def selected_permissions
    # split text of the permissions (space multiplication sign) to get the permission descriptions
    mult_symbol = CGI.unescapeHTML('&#215;')
    permissions_select.text.gsub(/^#{mult_symbol}/, '').split(CGI.unescapeHTML(" #{mult_symbol}"))
  end

  def remove_permission(permission)
    return if permission.blank?
    permissions_select.find(:xpath,
                            "//*[contains(text(), '#{permission}')]/preceding-sibling::span")
                      .click
  end

  def add_permission(permission)
    # open the drop-down
    permissions_select.find(:xpath, ".//span[@class='Select-arrow-zone']").click
    permissions_select.find(:xpath, ".//*[contains(text(), '#{permission}')]").click
  end

  def change_status(new_status)
    # find the status selectbox and drop it down
    find(:xpath, "//label[contains(text(),'Status')]/following-sibling::div").click
    within('div.Select-menu') do
      find('div.Select-option', text: new_status).click
    end
    # return the element with the new value
    find(:xpath, "//label[contains(text(),'Status')]/following-sibling::div")
  end

  def expect_success
    expect(page).to have_content('Your changes have been made successfully')
  end

  def new_email_address
    "capqacwds+test+#{Time.now.strftime('%y%m%d.%H%M%S')}@gmail.com"
  end

  def details_account_status
    find(:xpath,
         "//label[contains(text(),'Account Status')]/following-sibling::span").text
  end

  private

  def permissions_select
    find(
      :xpath,
      "//label[contains(text(),'Assigned Permissions')]/following-sibling::div"
    )
  end
end
