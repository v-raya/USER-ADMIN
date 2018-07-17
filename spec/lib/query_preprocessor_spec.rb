# frozen_string_literal: true

require 'rspec'
require 'rails_helper'

describe QueryPreprocessor do
  describe 'params_to_query_with_types' do
    it 'converts input params to hash with all combinations' do
      input = {
        'county.id': { query_type: 'term', value: '4' },
        'type.id': { query_type: 'term', value: [90, 99] },
        id: { query_type: 'match_phrase_prefix', value: '234' },
        name: { query_type: 'match_phrase_prefix', value: '' }
      }

      expected_output = [
        {
          'county.id': { query_type: 'term', value: '4' },
          'type.id': { query_type: 'term', value: 90 },
          id: { query_type: 'match_phrase_prefix', value: '234' }
        },
        {
          'county.id': { query_type: 'term', value: '4' },
          'type.id': { query_type: 'term', value: 99 },
          id: { query_type: 'match_phrase_prefix', value: '234' }
        }
      ]

      output = QueryPreprocessor.params_to_query_with_types(input)
      expect(output).to eq(expected_output)
    end
  end

  describe 'form_params_to_query_params' do
    it 'converts name-value into named-query-by-value format' do
      input = { last_name:  'Smith', first_name: 'John' }
      expected_output = { last_name: { query_type: 'match_phrase_prefix', value: 'Smith' },
                          first_name: { query_type: 'match_phrase_prefix', value: 'John' } }
      output = QueryPreprocessor.form_params_to_query_params(input)
      expect(output).to eq(expected_output)
    end
  end

  describe 'params_remove_blank_values' do
    it 'converts values to array and removes blank values' do
      input = {
        'county.id': { query_type: 'term', value: '4' },
        'type.id': { query_type: 'term', value: [90, 99] },
        id: { query_type: 'match_phrase_prefix', value: '234' },
        name: { query_type: 'match_phrase_prefix', value: '' }
      }

      expected_output = {
        'county.id': { query_type: 'term', value: ['4'] },
        'type.id': { query_type: 'term', value: [90, 99] },
        id: { query_type: 'match_phrase_prefix', value: ['234'] }
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
        id: { query_type: 'match_phrase_prefix', value: ['234'] }
      }
      input_values = [['4'], [90, 99], ['234']]
      input_query_types = %w[term term match_phrase_prefix]

      expected_output = [
        {
          'county.id': { query_type: 'term', value: '4' },
          'type.id': { query_type: 'term', value: 90 },
          id: { query_type: 'match_phrase_prefix', value: '234' }
        },
        {
          'county.id': { query_type: 'term', value: '4' },
          'type.id': { query_type: 'term', value: 99 },
          id: { query_type: 'match_phrase_prefix', value: '234' }
        }
      ]

      output = QueryPreprocessor.values_array_to_query_with_type(input_params, input_values,
                                                                 input_query_types)
      expect(output).to eq(expected_output)
    end
  end
end
