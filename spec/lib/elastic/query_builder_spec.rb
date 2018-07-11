# frozen_string_literal: true

require 'rspec'
require 'rails_helper'

describe Elastic::QueryBuilder do
  describe 'Build query' do
    it 'builds simple bool AND' do
      expected_output = {
        bool: {
          must: [
            { match: { 'last_name': 'Smith' } },
            { match: { 'first_name': 'John' } }
          ]
        }
      }

      input = [{ match: { 'last_name': 'Smith' } }, { match: { 'first_name': 'John' } }]
      output = Elastic::QueryBuilder.bool_and(input)

      expect(output).to eq(expected_output)
    end

    it 'builds complex bool AND/OR' do
      expected_output = {
        query: {
          bool: {
            must: [
              {
                bool: {
                  must: [
                    { match: { 'first_name': 'John' } },
                    { match: { 'last_name': 'Smith' } }
                  ]
                }
              }
            ]
          }
        }
      }

      input = [{ first_name: { query_type: 'match', value: 'John' },
                 last_name: { query_type: 'match', value: 'Smith' } }]
      output = Elastic::QueryBuilder.match_boolean(input)
      expect(output).to eq(expected_output)
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

    it 'build query merging pagination and sort' do
      expected_output = {
        query: {
          match: { 'last_name': 'Smith' }
        },
        from: '0',
        size: '5',
        sort: []
      }

      query_array = [
        { 'first_name': { query_type: 'match', value: 'John' },
          'last_name': { query_type: 'match', value: 'Smith' } }
      ]
      page_params = { 'order_params' => 'asc', 'size_params' => '5', 'from_params' => '0' }
      output = Elastic::QueryBuilder.user_search_v1(query_array, page_params)
      expect(output).to eq(expected_output)
    end
  end
end
