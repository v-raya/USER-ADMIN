# frozen_string_literal: true

module LoginHelper
  def login(login_config = default_json)
    login_json = JSON.generate(login_config)
    visit ENV['RAILS_RELATIVE_URL_ROOT'] || '/'
    puts "visited: landed on  #{current_url}.  "
    puts "ENV for county auth: #{ENV.fetch('COUNTY_AUTHORIZATION_ENABLED')}"
    puts "Logging in to county #{login_config[:county_name]}"
    puts "login_config #{login_config}"
    return unless ENV.fetch('COUNTY_AUTHORIZATION_ENABLED', false)
    puts "title #{page.title}"
    puts "BODY: #{page.body[0...2000]}"

    # puts "first input field :#{all('input')[0]}"
    fill_in 'Authorization JSON', with: login_json
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
