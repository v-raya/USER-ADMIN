# frozen_string_literal: true

require 'security/helper/account_helper'

module Security
  describe SecurityService do
    let(:test_subject) { Security::SecurityService.new }

    describe 'permitted?' do
      it 'returns true when no roles required and no exist' do
        permitted_roles = []
        account = AccountHelper::AccountHelper.new.account_with_roles([])
        expect(test_subject.permitted?(permitted_roles, account)).to eq true
      end

      it 'returns true when no roles required and some exists' do
        permitted_roles = []
        account = AccountHelper::AccountHelper.new.account_with_roles(%w[A B])
        expect(test_subject.permitted?(permitted_roles, account)).to eq true
      end

      it 'returns true when permitted role exists in profile' do
        permitted_roles = %w[A C]
        account = AccountHelper::AccountHelper.new.account_with_roles(['A'])
        expect(test_subject.permitted?(permitted_roles, account)).to eq true
      end

      it 'returns false when permitted role doesn"t exist in profile' do
        permitted_roles = %w[A C]
        account = AccountHelper::AccountHelper.new.account_with_roles(['B'])
        expect(test_subject.permitted?(permitted_roles, account)).to eq false
      end

      it 'returns false when no roles exist in profile' do
        permitted_roles = %w[A C]
        account = AccountHelper::AccountHelper.new.account_with_roles([])
        expect(test_subject.permitted?(permitted_roles, account)).to eq false
      end
    end
  end
end
