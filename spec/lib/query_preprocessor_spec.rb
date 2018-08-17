# frozen_string_literal: true

require 'rspec'
require 'rails_helper'

describe QueryPreprocessor do
  describe 'params_to_query_with_types' do
    it 'converts input params to hash with all combinations' do
      input = {
        'county.id': { query_type: 'term', value: '4' },
        'type.id': { query_type: 'term', value: [90, 99] },
        id: { query_type: 'match_phrase', value: '234' },
        name: { query_type: 'match', value: '' }
      }

      expected_output = [
        {
          'county.id': { query_type: 'term', value: '4' },
          'type.id': { query_type: 'term', value: 90 },
          id: { query_type: 'match_phrase', value: '234' }
        },
        {
          'county.id': { query_type: 'term', value: '4' },
          'type.id': { query_type: 'term', value: 99 },
          id: { query_type: 'match_phrase', value: '234' }
        }
      ]

      output = QueryPreprocessor.params_to_query_with_types(input)
      expect(output).to eq(expected_output)
    end
  end

  describe 'prepare_params_from_cap_submit' do
    it 'converts name-value into named-query-by-value format' do
      # input = { last_name:  'Smith', first_name: 'John' }
      input = [{ field: 'last_name', value: 'Smith' }, { field: 'first_name', value: 'John' }]
      expected_output = { last_name: { query_type: 'match_phrase_prefix', value: 'Smith' },
                          first_name: { query_type: 'match_phrase_prefix', value: 'John' } }
      output = QueryPreprocessor.prepare_params_from_cap_submit(input)
      expect(output).to eq(expected_output)
    end
  end

  describe 'build_query_hash' do
    let(:ascending_last_first_name_sort) do
      [
        { "last_name.for_sort": { "order": 'asc' } },
        { "first_name.for_sort": { "order": 'asc' } }
      ]
    end
    let(:es_match_all_query) do
      { query: { match_all: {} }, from: 51, size: 25,
        sort: ascending_last_first_name_sort }
    end
    let(:match_last_name_with_paging) do
      { query: [{ field: 'last_name', value: 'Smith' }],
        from: 51, size: 25, sort: [field: 'last_name', desc: true] }
    end
    let(:match_empty_last_name_with_paging) do
      { query: [{ field: 'last_name', value: '' }],
        from: 51, size: 25, sort: [field: 'last_name', desc: true] }
    end
    let(:match_wide_open_with_paging) do
      { query: [], from: 51, size: 25, sort: [field: 'last_name', desc: true] }
    end
    let(:es_query_for_last_name) do
      { query: { match_phrase_prefix: { last_name: 'Smith' } },
        from: 51, size: 25, sort: ascending_last_first_name_sort }
    end
    it 'builds up a query by last name for elastic search correctly' do
      expect(QueryPreprocessor.build_query_hash(match_last_name_with_paging))
        .to eq(es_query_for_last_name)
    end
    it 'builds up  wide-open query for elastic search correctly' do
      expect(QueryPreprocessor.build_query_hash(match_wide_open_with_paging))
        .to eq(es_match_all_query)
    end
    it 'builds up a blank search for elastic search correctly' do
      expect(QueryPreprocessor.build_query_hash(match_empty_last_name_with_paging))
        .to eq(es_match_all_query)
    end
  end

  describe 'params_remove_blank_values' do
    it 'converts values to array and removes blank values' do
      input = {
        'county.id': { query_type: 'term', value: '4' },
        'type.id': { query_type: 'term', value: [90, 99] },
        id: { query_type: 'match_phrase', value: '234' },
        name: { query_type: 'match', value: '' }
      }

      expected_output = {
        'county.id': { query_type: 'term', value: ['4'] },
        'type.id': { query_type: 'term', value: [90, 99] },
        id: { query_type: 'match_phrase', value: ['234'] }
      }

      output = QueryPreprocessor.params_remove_blank_values(input)
      expect(output).to eq(expected_output)
    end
  end

  describe 'values_array_to_query_with_type' do
    it 'generates query with all combinations' do
      input_params = {
        'county.id': { query_type: 'term', value: ['4'] },
        'type.id': { query_type: 'term', value: [90, 99] },
        id: { query_type: 'match_phrase', value: ['234'] }
      }
      input_values = [['4'], [90, 99], ['234']]
      input_query_types = %w[term term match_phrase match_phrase_prefix]

      expected_output = [
        {
          'county.id': { query_type: 'term', value: '4' },
          'type.id': { query_type: 'term', value: 90 },
          id: { query_type: 'match_phrase', value: '234' }
        },
        {
          'county.id': { query_type: 'term', value: '4' },
          'type.id': { query_type: 'term', value: 99 },
          id: { query_type: 'match_phrase', value: '234' }
        }
      ]

      output = QueryPreprocessor
               .values_array_to_query_with_type(input_params, input_values, input_query_types)
      expect(output).to eq(expected_output)
    end
  end
end
