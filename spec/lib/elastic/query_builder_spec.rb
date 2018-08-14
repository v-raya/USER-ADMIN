# frozen_string_literal: true

require 'rspec'
require 'rails_helper'

describe Elastic::QueryBuilder do
  describe 'Build query' do
    it 'builds simple bool AND' do
      expected_output = {
        bool: {
          must: [
            { match_phrase_prefix: { 'last_name': 'Smith' } },
            { match_phrase_prefix: { 'first_name': 'John' } }
          ]
        }
      }

      input = [{ match_phrase_prefix: { 'last_name': 'Smith' } },
               { match_phrase_prefix: { 'first_name': 'John' } }]
      output = Elastic::QueryBuilder.bool_and(input)

      expect(output).to eq(expected_output)
    end

    it 'builds complex bool AND/OR' do
      expected_output = {
        query: {
          bool: {
            should: [
              {
                bool: {
                  must: [
                    { match_phrase_prefix: { 'last_name': 'Smith' } },
                    { match_phrase_prefix: { 'first_name': 'John' } }
                  ]
                }
              }
            ]
          }
        }
      }

      input = [{ last_name: { query_type: 'match_phrase_prefix', value: 'Smith' },
                 first_name: { query_type: 'match_phrase_prefix', value: 'John' } }]
      output = Elastic::QueryBuilder.match_boolean(input)
      expect(output.to_s).to eq(expected_output.to_s)
    end

    it 'builds sort query' do
      expected_output = {
        sort: [
          '_score',
          {
            'last_name.for_sort' =>
            {
              order: 'asc'
            }
          }
        ]
      }
      input = { 'sort_params' => 'last_name.for_sort', 'order_params' => 'asc' }
      output = Elastic::QueryBuilder.sort_query(input)
      expect(output).to eq(expected_output)
    end

    it 'builds paginate query' do
      expected_output = {
        from: '0',
        size: '5'
      }
      input = { 'size_params' => '5', 'from_params' => '0' }
      output = Elastic::QueryBuilder.paginate_query(input)
      expect(output).to eq(expected_output)
    end
  end
end
