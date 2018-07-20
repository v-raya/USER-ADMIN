# frozen_string_literal: true

require 'pry'
require 'json'
require 'uri'

module Api
  class UserListController < ActionController::API
    def index_legacy
      params = Users::User.new(allowed_params_to_search).to_h.compact
      users = Users::UserRepository.new.get_users(params, session[:token])
      render json: users
    end

    def transorm_request_cog12(req)
      es_req = {}
      es_req[:from] = req["from"] || 0
      es_req[:size] = req["size"] || 100

      # FIXME: es complains: `Fielddata is disabled on text fields by default ...` if non-empty array/object is provided
      # es_req[:sort] = req["sort"].collect {|x|
      #   field = x["field"]
      #   order = x["desc"] ? "desc" : "asc"
      #   out = {}
      #   out[field] = order
      #   out
      # }

      # FIXME: using match_phrase_prefix b/c es index doesn't use analyzable field for last_name
      last_name_query = req["query"].detect{|w| w["field"] == "last_name"}
      if !last_name_query.nil? && !last_name_query["value"].empty?
        es_req[:query] = { match_phrase_prefix: { last_name: last_name_query["value"] } }
      end
      es_req
    end

    def index_cog12
      search_spec =  JSON.parse(URI.unescape(params[:q]))
      req = transorm_request_cog12(search_spec)
      res = Users::UserRepository.search(req, session[:token])
      records = collect_users(res)
      out = { records: records, meta: { total: res[:hits][:total], request: search_spec } }
      render json: out, status: :ok
    end

    def index
      return index_legacy unless Elastic::QueryBuilder.elastic_search?
      return index_cog12

      es_query_json = build_query_hash
      logger.debug "should be posted as #{JSON.generate(es_query_json)}"
      users = Users::UserRepository.search(es_query_json, session[:token])
      @users_response = collect_users(users)
      render json: @users_response, status: :ok
    end

    private

    def collect_users(users)
      users[:hits][:hits].collect { |user| user[:_source] }
    end

    def assign_page_params
      page_params = {}
      page_params['size_params'] = params[:size] || 50
      page_params['from_params'] = params[:from] || 0
      page_params
    end

    def allowed_params_to_search
      params.permit(:last_name, :format).to_h
    end

    def build_query_hash
      user_hash = Users::User.new(allowed_params_to_search).to_h.compact
      query = QueryPreprocessor.form_params_to_query_params(user_hash)
      page_params = assign_page_params
      query_hash = {}
      query_hash = QueryPreprocessor.params_to_query_with_types(query) unless query.empty?
      Elastic::QueryBuilder.user_search_v1(query_hash, page_params)
    end
  end
end
