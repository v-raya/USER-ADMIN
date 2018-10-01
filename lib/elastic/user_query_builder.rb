# frozen_string_literal: true

module Elastic
  class UserQueryBuilder
    include ActiveModel::Model

    def self.get_search(request)
      query(request[:query])
        .merge(paginate_query(request)).merge(sort_query)
    end

    def self.query(query)
      leaves = query_leaves(query)
      if leaves.blank?
        match_all
      else
        bool_and_query(leaves)
      end
    end

    def self.paginate_query(query)
      {
        from: query[:from],
        size: query[:size]
      }
    end

    def self.query_leaves(query)
      query.map do |subquery|
        subquery_as_es(subquery)
      end.compact
    end

    def self.subquery_as_es(subquery)
      case subquery[:field].to_sym
      when :office_ids
        { terms: { 'office_id.keyword': subquery[:value] } } unless subquery[:value].empty?
      when :last_name
        { match_phrase_prefix: { last_name: subquery[:value] } } unless subquery[:value].empty?
      else
        Rails.logger.debug("unrecognized query field (#{subquery[:field].to_sym})")
        nil
      end
    end

    def self.sort_query
      { sort: [{ "last_name.for_sort": { order: 'asc' } },
               { "first_name.for_sort": { order: 'asc' } }] }
    end

    def self.bool_and_query(query_leaves)
      {
        query: {
          bool: {
            must: query_leaves
          }
        }
      }
    end

    def self.match_all
      {
        query: {
          match_all: {}
        }
      }
    end
  end
end
