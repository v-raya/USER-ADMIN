# frozen_string_literal: true

module LoginHelper
  def login(login_config = default_json)
    visit '/'
    return unless ENV.fetch('CASE_AUTHORIZATION_ENABLED', false)
    fill_in 'Authorization JSON', with: JSON.generate(login_config)
    click_button 'Sign In'
  end

  private

  def default_json
    {
      'user': 'RACFID',
      'staffId': 'aa1',
      'roles': ['Supervisor'],
      'county_code': '56',
      'county_cws_code': '1123',
      'county_name': 'Ventura',
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
