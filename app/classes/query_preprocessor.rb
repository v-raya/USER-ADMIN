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

  def self.params_remove_blank_values(params)
    # remove blank values from each array
    params.each do |k,v|
      params[k][:value] = [v[:value]] if v[:value].class != Array
      params[k][:value] = params[k][:value].reject(&:blank?)
    end
    params.delete_if{|k,v| v[:value].empty?}
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
