class Elastic::QueryBuilder
  include ActiveModel::Model

  def self.leaf_queries(query_hash)
    query_leaves = []

    # each key is an attribute to query on
    query_hash.each do |k, v|
      query_leaves << { v[:query_type].to_sym => { k.to_sym => v[:value] } }
    end

    return query_leaves
  end

  # wrap individual leaf queries in bool must
  def self.bool_and(query_leaves)
    return {
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
  # {"query":{"bool":{"should":[{"bool":{"must":[{"match":{"fac_co_nbr":"28"}},{"match":{"fac_name":"home"}}]}},{"bool":{"must":[{"match":{"fac_co_nbr":"18"}}]}}]}}}
  #
  def self.match_boolean(query_array)

    # prepare array of match queries.
    combined_query_array = []

    # loop through each array item to create piece of query
    query_array.each do |itm|
      # combined_query_array << address_query(itm.delete('addresses.address.street_address')) if itm['addresses.address.street_address'].present?
      combined_query_array << bool_and(leaf_queries(itm))
    end
    # wrap array in a bool OR query
    return {
      query: {
        bool: {
          should: combined_query_array
        }
      }
    }
  end

  def self.sort_query(page_params)
    if page_params['sort_params'].present? && page_params['order_params'].present?
      return {
        sort: [
          '_score',
          {
            page_params['sort_params'] =>
            {
              order: page_params['order_params']
            }
          }
        ]
      }
    else
      return { sort: [] }
    end
  end

  def self.paginate_query(page_params)
    return {
      from: page_params['from_params'],
      size: page_params['size_params']
    }
  end

  def self.facility_search_v1(query_array, page_params)
    address_params = query_array.map {|param| param[:'addresses.address']}.first

    if address_params
      query_array_without_address = [query_array.first.except(:'addresses.address')]
      search_query = match_boolean(query_array_without_address).merge(paginate_query(page_params)).merge(sort_query(page_params))
      search_query[:query][:bool][:should].first[:bool][:must] << address_query(address_params[:value])
      return search_query
    else
      match_boolean(query_array).merge(paginate_query(page_params)).merge(sort_query(page_params))
    end
  end

  def self.address_query(address_params)
    return {
      multi_match: {
        query: address_params,
        type: 'best_fields',
        fields: %w[full_residential_address full_mailing_address]
      }
    }
  end
end
