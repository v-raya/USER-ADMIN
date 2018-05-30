# frozen_string_literal: true

module LoginHelper
  def login(login_config = default_json)
    visit ENV['RAILS_RELATIVE_URL_ROOT'] || '/'
    puts "visited: landed on  #{current_url}"

    return unless ENV.fetch('COUNTY_AUTHORIZATION_ENABLED', false)
    fill_in 'Authorization JSON', with: JSON.generate(login_config)
    click_button 'Sign In'
    puts "signed in: #{current_url}"
  end

  private

  def default_json
    {
      'user': 'RACFID',
      'staffId': 'aa1',
      'roles': ['CWS-admin', 'Supervisor'],
      'county_code': '56',
      'county_cws_code': '1123',
      'county_name': 'Placer',
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
