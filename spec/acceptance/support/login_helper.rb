# frozen_string_literal: true

module LoginHelper
  def login
    visit ENV['RAILS_RELATIVE_URL_ROOT'] || '/'
    if page.has_content?('Authorization JSON')
      json_login
    else
      cognito_login
    end

    go_manage_users if page.has_content?('Services & Resources')
  end

  def json_login(login_config = default_json)
    login_json = JSON.generate(login_config)
    visit ENV['RAILS_RELATIVE_URL_ROOT'] || '/'
    puts "ENV for county auth: #{ENV.fetch('COUNTY_AUTHORIZATION_ENABLED', nil)}"
    puts "Logging in to county #{login_config[:county_name]}"

    puts "visited: landed on #{current_url}"

    submit_json_form(login_json) if current_url.include?('login.html')
  end

  def cognito_login
    visit ENV.fetch('RAILS_RELATIVE_URL_ROOT', '/')
    return unless current_url.include?('login')

    puts "Fill in user name with #{ENV.fetch('COGNITO_USERNAME', 'no-reply@osi.ca.gov')}"
    puts "Fill in pass with #{ENV.fetch('COGNITO_PASSWORD', 'password')}"
    fill_in 'Email', with: ENV.fetch('COGNITO_USERNAME', 'no-reply@osi.ca.gov')
    fill_in 'Password', with: ENV.fetch('COGNITO_PASSWORD', 'password')
    click_on 'Sign In'
    verify_account
  end

  def cognito_invalid_login
    visit ENV.fetch('RAILS_RELATIVE_URL_ROOT', '/')
    return unless current_url.include?('login')

    fill_in 'Email', with: 'no-reply@osi.ca.gov'
    fill_in 'Password', with: 'password'
    click_on 'Sign In'
  end

  def cognito_login_with_invalid_mfa
    visit ENV.fetch('RAILS_RELATIVE_URL_ROOT', '/')
    return unless current_url.include?('login')

    fill_in 'Email', with: 'y_test111+role2@outlook.com'
    fill_in 'Password', with: 'Password123*'
    click_on 'Sign In'
    invalid_mfa
  end

  def click_forgot_password_link
    visit ENV.fetch('RAILS_RELATIVE_URL_ROOT', '/')
    return unless current_url.include?('login')

    click_link 'Forgot your password?'
  end

  def reset_password
    fill_in 'Email', with: 'y_test111+role1@outlook.com'
    click_button 'Reset my password'
  end

  def logout_link
    visit "#{ENV.fetch('COUNTY_ADMIN_WEB_BASE_URL', '/')}/logout"
  end

  private

  def verify_account
    # verify via MFA using static value assigned to this user.
    return unless page.has_content?('Account Verification')

    fill_in 'Enter Code Here', with: 'LETMEIN'
    click_on 'Verify'
  end

  def invalid_mfa
    # verify via MFA using static value assigned to this user.
    return unless page.has_content?('Account Verification')

    fill_in 'Enter Code Here', with: 'LETMEI1'
    click_on 'Verify'
  end

  def go_manage_users
    find(:xpath, '//h3[.="Manage Users"]/ancestor::div[@class="panel panel-default"]').click_on 'Go'
  end

  def submit_json_form(login_json)
    return unless ENV.fetch('COUNTY_AUTHORIZATION_ENABLED', false)

    fill_in 'Authorization JSON', with: login_json
    click_button 'Sign In'
    puts "signed in: #{current_url}"
  end

  def default_json
    {
      'user': 'RACFID',
      'staffId': 'aa1',
      'roles': ['CWS-admin', 'County-admin'],
      'county_code': '56',
      'county_cws_code': '1123',
      'county_name': 'Madera',
      'privileges': [
        'CWS Case Management System',
        'Resource Management',
        'Resource Mgmt Placement Facility Maint',
        'Sealed',
        'Sensitive Persons'
      ]
    }
  end
end
