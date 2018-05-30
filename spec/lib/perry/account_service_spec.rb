# frozen_string_literal: true

module Perry
  describe AccountService do
    let(:security_gateway) { instance_double('Infrastructure::SecurityGateway') }
    let(:test_subject) { Perry::AccountService.new(security_gateway) }

    describe '#get_perry_account' do
      context 'with valid token' do
        it 'returns perry account' do
          token = 'good_token'
          perry_account_string = '{ "user": "RACFID", "staffId": "aa1", "roles": ' \
            '[ "Supervisor" ], "county_code": "56", "county_name": "Ventura", "privileges": ' \
            '[ "Countywide Read", "Sensitive Persons" ] }'
          allow(security_gateway).to receive(:validate_token)
            .with(token)
            .and_return(perry_account_string)
          expect(test_subject.get_perry_account(token).staff_id).to eq 'aa1'
        end
      end
    end
  end
end
