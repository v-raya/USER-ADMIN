# frozen_string_literal: true

module LoginHelper
  def login(login_config = default_json)
    login_json = JSON.generate(login_config)
    visit ENV['RAILS_RELATIVE_URL_ROOT'] || '/'
    puts "ENV for county auth: #{ENV.fetch('COUNTY_AUTHORIZATION_ENABLED', nil)}"
    puts "Logging in to county #{login_config[:county_name]}"

    puts "visited: landed on #{current_url}"
    if current_url.include?('login.html')
      submit_json_form(login_json)
    else
      puts 'Already logged in'
      return
    end
  end

  private

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
      'roles': ['CWS-admin', 'Supervisor'],
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
