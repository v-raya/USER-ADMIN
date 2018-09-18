# frozen_string_literal: true

require 'spec_helper'

describe 'ApiError' do
  describe '#initialize' do
    let(:api_error) { ApiError.new 'error response', 400 }

    context '#response' do
      it 'returns the correct response' do
        expect(api_error.response).to eql 'error response'
      end
    end
    context '#status' do
      it 'returns the correct status' do
        expect(api_error.status).to eql 400
      end
    end
  end
end
