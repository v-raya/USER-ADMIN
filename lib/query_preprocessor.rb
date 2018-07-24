# frozen_string_literal: true

class QueryPreprocessor
  def self.params_to_query_with_types(params)
    params_remove_blank_values(params)
    values = []
    query_types = []

    params.each_value do |v|
      values << v[:value]
      query_types << v[:query_type]
    end

    values_array_to_query_with_type(params, values, query_types)
  end

  def self.prepare_params_from_cap_submit(query)
    params = {}
    query.each do |subquery|
      value = subquery[:value]
      key = subquery[:field].to_sym
      params[key] = { query_type: 'match_phrase_prefix', value: value } unless value.blank?
    end
    params
  end

  def self.build_query_hash(search)
    page_params = assign_page_params(search[:size], search[:from])
    query_prepared = prepare_params_from_cap_submit(search[:query])

    search_hash = query_prepared.empty? ? {} : params_to_query_with_types(query_prepared)

    Elastic::QueryBuilder.user_search_v1(search_hash, page_params)
  end

  def self.assign_page_params(size, from)
    page_params = {}

    page_params['size_params'] = size || 50
    page_params['from_params'] = from || 0
    page_params
  end

  def self.params_remove_blank_values(params)
    # remove blank values from the array
    params.each do |key, value|
      params[key][:value] = [value[:value]] if value[:value].class != Array
      params[key][:value] = params[key][:value].reject(&:blank?)
    end
    params.delete_if { |_key, value| value[:value].empty? }
  end

  def self.values_array_to_query_with_type(query_params, values, query_types)
    # if more than 1 field selected, we need to generate combinations
    combinations = values[0].product(*values[1..-1])

    queries = combinations.map do |c|
      c.map.with_index do |c1, i|
        { query_type: query_types[i], value: c1 }
      end
    end
    queries.map { |p| Hash[query_params.keys.zip p] }
  end
end
