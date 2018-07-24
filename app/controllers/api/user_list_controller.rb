# frozen_string_literal: true

require 'json'

module Api
  class UserListController < ActionController::API
    def index_legacy
      params = Users::User.new(allowed_params_to_search).to_h.compact
      users = Users::UserRepository.new.get_users(params, session[:token])
      render json: users
    end

    def transorm_request_cog12(req)
      es_req = {}
      es_req[:from] = req['from'] || 0
      es_req[:size] = req['size'] || 100

      # FIXME: es complains: `Fielddata is disabled on text fields by default ...`
      #   if non-empty array/object is provided
      # es_req[:sort] = req['sort'].collect {|x|
      #   field = x['field']
      #   order = x['desc'] ? 'desc' : 'asc'
      #   out = {}
      #   out[field] = order
      #   out
      # }

      # FIXME: using match_phrase_prefix b/c es index doesn't use analyzable field for last_name
      last_name_query = req['query'].detect { |w| w['field'] == 'last_name' }
      if !last_name_query.nil? && !last_name_query['value'].empty?
        es_req[:query] = { match_phrase_prefix: { last_name: last_name_query['value'] } }
      end
      es_req
    end

    def index_cog12
      search_spec = JSON.parse(CGI.unescape(params[:q]))
      req = transorm_request_cog12(search_spec)
      res = Users::UserRepository.search(req, session[:token])
      records = collect_users(res)
      out = { records: records, meta: { total: res[:hits][:total], request: search_spec } }
      render json: out, status: :ok
    end

    def index
      return index_legacy unless Elastic::QueryBuilder.elastic_search?
      q = allowed_params_to_search[:q]
      query = q ? JSON.parse(q, symbolize_names: true) : {}

      es_query_json = QueryPreprocessor.build_query_hash(query)
      logger.debug "should be posted as #{JSON.generate(es_query_json)}"

      es_response = Users::UserRepository.search(es_query_json, session[:token])
      @users_response = user_response(es_response, query)
      render json: @users_response, status: :ok
    end

    private

    def user_response(es_response, request_query)
      users = es_response[:hits][:hits].collect { |user| user[:_source] }
      total = es_response[:hits][:total]

      { records: users, meta: { total: total, req: request_query } }
    end

    def allowed_params_to_search
      params.permit(:q)
    end
  end
end
