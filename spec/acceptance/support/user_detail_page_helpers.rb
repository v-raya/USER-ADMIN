# frozen_string_literal: true

module UserDetailPageHelper
  def page_is_user_details
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
    status_select = find(:xpath, "//label[contains(text(),'Status')]/following-sibling::div").click
    # click on the opposite
    status_select.find(:xpath, "//*[contains(text(), '#{new_status}')]").click
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
