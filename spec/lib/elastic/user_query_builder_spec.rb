# frozen_string_literal: true

require 'rspec'
require 'rails_helper'

describe Elastic::UserQueryBuilder do
  describe '.get_search' do
    it 'processes the combination of last name and office parameters' do
      expected_output = {
        query: {
          bool: {
            must: [
              { match_phrase_prefix: { 'last_name': 'Smith' } },
              { terms: { 'office_id.keyword': %w[north south east west] } }
            ]
          }
        },
        from: 0,
        size: 50,
        sort: [{ "last_name.for_sort": { order: 'asc' } },
               { "first_name.for_sort": { order: 'asc' } }]
      }
      input_query = { "query": [{ "field": 'last_name', "value": 'Smith' },
                                { "field": 'office_ids', "value": %w[north south east west] }],
                      "sort": [], "size": 50, "from": 0 }

      output = Elastic::UserQueryBuilder.get_search(input_query)
      expect(output).to eq(expected_output)
    end

    it 'processes invalid search criteria by removing it' do
      expected_output = {
        query: {
          bool: {
            must: [
              { match_phrase_prefix: { 'last_name': 'Smith' } }
            ]
          }
        },
        from: 0,
        size: 50,
        sort: [{ "last_name.for_sort": { order: 'asc' } },
               { "first_name.for_sort": { order: 'asc' } }]
      }
      input_query = { "query": [{ "field": 'last_name', "value": 'Smith' },
                                { "field": 'random', "value": 'guess' }],
                      "sort": [], "size": 50, "from": 0 }

      output = Elastic::UserQueryBuilder.get_search(input_query)
      expect(output).to eq(expected_output)
    end
  end

  describe '.query' do
    it 'processes the search filter for last_name and office_ids' do
      expected_output = {
        query: {
          bool: {
            must: [
              { match_phrase_prefix: { 'last_name': 'Smith' } },
              { terms: { 'office_id.keyword': %w[north south east west] } }
            ]
          }
        }
      }
      input_query = { "query": [{ "field": 'last_name', "value": 'Smith' },
                                { "field": 'office_ids', "value": %w[north south east west] }],
                      "sort": [], "size": 50, "from": 0 }
      # input_query[:last_name] = 'Smith'
      # q: {"query":[{"field":"last_name","value":"Bl"}],"sort":[],"size":50,"from":0}

      output = Elastic::UserQueryBuilder.query(input_query[:query])
      expect(output).to eq(expected_output)
    end

    it 'processes the search filter for last_name, office_ids, enabled-account-status' do
      expected_output = {
        query: {
          bool: {
            must: [
              { match_phrase_prefix: { 'last_name': 'Smith' } },
              { terms: { 'office_id.keyword': %w[north south east west] } },
              { term: { 'enabled': 'true' } }
            ]
          }
        }
      }
      input_query = { "query": [{ "field": 'last_name', "value": 'Smith' },
                                { "field": 'office_ids', "value": %w[north south east west] },
                                { "field": 'enabled', "value": true }],
                      "sort": [], "size": 50, "from": 0 }
      # input_query[:last_name] = 'Smith'
      # q: {"query":[{"field":"last_name","value":"Bl"}],"sort":[],"size":50,"from":0}

      output = Elastic::UserQueryBuilder.query(input_query[:query])
      expect(output).to eq(expected_output)
    end

    it 'processes a set of empty filters as a match_all' do
      expected_output = {
        query: {
          match_all: {}
        }
      }
      input_query = { "query": [{ "field": 'last_name', "value": '' },
                                { "field": 'office_ids', "value": [] },
                                { "field": 'enabled', "value": '' }],
                      "sort": [], "size": 50, "from": 0 }
      # input_query[:last_name] = 'Smith'
      # q: {"query":[{"field":"last_name","value":"Bl"}],"sort":[],"size":50,"from":0}

      output = Elastic::UserQueryBuilder.query(input_query[:query])
      expect(output).to eq(expected_output)
    end
  end

  it 'processes an empty set of filters as a match_all' do
    expected_output = {
      query: {
        match_all: {}
      }
    }
    input_query = { "query": [],
                    "sort": [], "size": 50, "from": 0 }
    # input_query[:last_name] = 'Smith'
    # q: {"query":[{"field":"last_name","value":"Bl"}],"sort":[],"size":50,"from":0}

    output = Elastic::UserQueryBuilder.query(input_query[:query])
    expect(output).to eq(expected_output)
  end

  describe '.paginate_query' do
    it 'paginates according to the input' do
      input_query = { "query": [{ "field": 'last_name', "value": 'Smith' },
                                { "field": 'office_ids', "value": %w[north south east west] }],
                      "sort": [], "size": 50, "from": 0 }
      expected_output = { from: 0, size: 50 }
      output = Elastic::UserQueryBuilder.paginate_query(input_query)
      expect(output).to eq(expected_output)
    end
  end

  describe '.sort_query' do
    it 'sorts according to preset rules' do
      expected_output = { sort: [{ "last_name.for_sort": { order: 'asc' } },
                                 { "first_name.for_sort": { order: 'asc' } }] }
      output = Elastic::UserQueryBuilder.sort_query
      expect(output).to eq(expected_output)
    end
  end
end
