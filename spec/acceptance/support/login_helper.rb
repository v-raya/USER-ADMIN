# frozen_string_literal: true

module LoginHelper
  def login(login_config = default_json)
    login_json = JSON.generate(login_config)
    visit ENV['RAILS_RELATIVE_URL_ROOT'] || '/'
    puts "login_config #{login_config}"
    return unless ENV.fetch('COUNTY_AUTHORIZATION_ENABLED', false)
    check_status login_config
    fill_in 'username', with: login_json
    click_button 'Sign In'
    puts "signed in: #{current_url}"
  end

  def check_status(login_config)
    puts "landed on  #{current_url}. AUTH: #{ENV.fetch('COUNTY_AUTHORIZATION_ENABLED')}"
    puts "Logging in to county #{login_config[:county_name]}"
  end

  private

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
