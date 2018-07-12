# frozen_string_literal: true

module LoginHelper
  def login(login_config = default_json)
    login_json = JSON.generate(login_config)
    visit ENV['RAILS_RELATIVE_URL_ROOT'] || '/'
    puts "visited: landed on  #{current_url}.  "
    if current_url.include?('accessCode=')
      puts 'Already logged in'
      return
    end
    puts "ENV for county auth: #{ENV.fetch('COUNTY_AUTHORIZATION_ENABLED')}"
    puts "Logging in to county #{login_config[:county_name]}"
    submit_json_form(login_json) if ENV.fetch('COUNTY_AUTHORIZATION_ENABLED', false)
  end

  private

  def submit_json_form(login_json)
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
      'county_name': 'Yolo',
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
