# frozen_string_literal: true

module Elastic
  class QueryBuilder
    include ActiveModel::Model

    def self.elastic_search?
      ENV['ELASTIC_SEARCH_MODE'] != 'false'
    end

    def self.leaf_queries(query_hash)
      query_leaves = []

      # each key is an attribute to query on
      query_hash.each do |k, v|
        query_leaves << { v[:query_type].to_sym => { k.to_sym => v[:value] } }
      end

      query_leaves
    end

    # wrap individual leaf queries in bool must
    def self.bool_and(query_leaves)
      {
        bool: {
          must: query_leaves
        }
      }
    end

    # query_array : array of hash - attributes and values to query
    # all keys of a hash will be combined with   AND
    #  each array item will be combined with  OR
    #
    # input [ {fac_co_nbr: '23', fac_name: 'home'}, {fac_co_nbr: '45'} ]
    # translates to  (fac_co_nbr: 23 AND fac_name: home) OR (fac_co_nbr: 45)
    # returns:
    # {"query":{"bool":{"must":[{"bool":{"must":[{"match":{"fac_co_nbr":"28"}},
    #   {"match":{"fac_name":"home"}}]}},{"bool":{"must":[{"match":{"fac_co_nbr":"18"}}]}}]}}}
    #
    def self.match_boolean(query_array)
      # prepare array of match queries.
      combined_query_array = []

      # loop through each array item to create piece of query
      query_array.each do |itm|
        combined_query_array << bool_and(leaf_queries(itm))
      end
      # wrap array in a bool OR query
      {
        query: { bool: { must: combined_query_array } }
      }
    end

    def self.match_all
      {
        query: {
          match_all: {}
        }
      }
    end

    def self.sort_query(page_params)
      sort = { sort: [] }
      if page_params['sort_params'].present? && page_params['order_params'].present?
        sort = {
          sort: [
            '_score',
            { page_params['sort_params'] => { order: page_params['order_params'] } }
          ]
        }
      end
      sort
    end

    def self.paginate_query(page_params)
      {
        from: page_params['from_params'],
        size: page_params['size_params']
      }
    end

    def self.user_search_v1(query_array, page_params)
      search_params = query_array.map { |param| param[:last_name] }.first

      if search_params
        search_query = search_query(search_params[:value])
                       .merge(paginate_query(page_params))
                       .merge(sort_query(page_params))
        return search_query
      else
        match_all
      end
    end

    def self.search_query(search_params)
      { query: { match_phrase_prefix: { "last_name": search_params } } }
    end
  end
end
