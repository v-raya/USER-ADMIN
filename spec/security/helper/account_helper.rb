# frozen_string_literal: true

module AccountHelper
  class AccountHelper
    def account_with_roles(roles)
      account = Perry::Account.new(default_json)
      roles.each { |a| account.roles.push(a) }
      account
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
end
