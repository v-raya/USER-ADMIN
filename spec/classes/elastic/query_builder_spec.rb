require 'rspec'
require 'rails_helper'

describe FacilitiesController do

  describe "Build query" do
    it "builds simple bool AND" do
      expected_output = {
        bool: {
          must: [
            { match: {'fac_co_nbr':'28'} },
            { match:{'fac_name':'home'} }
          ]
      }}

      input = [{ match: {'fac_co_nbr':'28'} },{ match:{'fac_name':'home'} }]
      output = Elastic::QueryBuilder.bool_and(input)

      expect(output).to eq(expected_output)
    end

    it "builds complex bool AND/OR" do
      expected_output = {
        query: {
          bool: {
            should: [
              {bool:
               {must: [
                  {match:{'fac_co_nbr':'28'}},
                  {match:{'fac_name':'home'}}
                ]
                }
               }]
          }
        }
      }

      input = [{fac_co_nbr: {query_type: 'match', value: '28'}, fac_name: {query_type: 'match', value: 'home'}}]
      output = Elastic::QueryBuilder.match_boolean(input)
      expect(output).to eq(expected_output)
    end

    it "builds sort query" do
      expected_output = {
        sort: [
          '_score',
          {
            'name.for_sort' =>
            {
              order: 'asc'
            }
          }
        ]
      }
      input = {"sort_params"=>"name.for_sort", "order_params"=>"asc"}
      output = Elastic::QueryBuilder.sort_query(input)
      expect(output).to eq(expected_output)
    end

    it "builds paginate query" do
      expected_output = {
        from: '0',
        size: '5'
      }
      input = {"size_params"=>"5", "from_params"=>"0"}
      output = Elastic::QueryBuilder.paginate_query(input)
      expect(output).to eq(expected_output)
    end

    it "build query merging pagination and sort" do
      expected_output = {
        query:{
          bool:{
            should:[
              {
                bool:{
                  must:[
                    {match:{"county.value": "Los Angeles"}},
                    {term:{"type.value": "Resource Family Home"}},
                    {match_phrase:{"id": "123124"}},
                    {match:{"name": "home"}}
                  ]
                }
              }
            ]
          }
        },
        from:"0",
        size:"5",
        sort: []
      }

      query_array = [
        {"county.value": {query_type: 'match', value: "Los Angeles"},
         "type.value":{query_type: 'term', value: "Resource Family Home"},
         "id": {query_type: 'match_phrase', value: "123124"},
         "name": {query_type: 'match', value: "home"}}
      ]
      page_params = {"order_params"=>"asc", "size_params"=>"5", "from_params"=>"0"}
      output = Elastic::QueryBuilder.facility_search_v1(query_array, page_params)
      expect(output).to eq(expected_output)
    end

    it "build query with address, merging pagination and sort" do
      expected_output = {
        query:{
          bool:{
            should:[
              {
                bool:{
                  must:[
                    {match:{"county.value": "Los Angeles"}},
                    {term:{"type.value": "Adoption Agency"}},
                    {match_phrase:{"id": "9jstosjaww"}},
                    {match:{"name": "home"}},
                    {
                      multi_match:{
                        query: "4140 Roxanne Street",
                        type: "best_fields",
                        fields:['full_residential_address', 'full_mailing_address']
                      }
                    }
                  ]
                }
              }
            ]
          }
        },
        from:"0",
        size:"5",
        sort: [
          '_score',
          {'name.for_sort' => {order: 'asc'}}
        ]
      }

      query_array = [
        {"county.value":  {query_type: 'match', value: "Los Angeles"}, "type.value":  {query_type: 'term', value: "Adoption Agency"}, "id":  {query_type: 'match_phrase', value: "9jstosjaww"}, "name":  {query_type: 'match', value: "home"}, :"addresses.address" => {query_type: 'match', value: "4140 Roxanne Street"}},
        {"county.value":  {query_type: 'match', value: "Los Angeles"}, "type.value":  {query_type: 'term', value: "Adoption Agency"}, "id":  {query_type: 'match_phrase', value: "9jstosjaww"}, "name":  {query_type: 'match', value: "home"}, :"addresses.address" => {query_type: 'match', value: " Los Angeles"}},
        {"county.value":  {query_type: 'match', value: "Los Angeles"}, "type.value":  {query_type: 'term', value: "Adoption Agency"}, "id":  {query_type: 'match_phrase', value: "9jstosjaww"}, "name":  {query_type: 'match', value: "home"}, :"addresses.address" => {query_type: 'match', value: " CA 97777"}}
      ]
      page_params = {"sort_params"=>"name.for_sort", "order_params"=>"asc", "size_params"=>"5", "from_params"=>"0"}
      output = Elastic::QueryBuilder.facility_search_v1(query_array, page_params)
      expect(output).to eq(expected_output)
    end

  end

end
