# frozen_string_literal: true

require 'json'

module Api
  class UserListController < ActionController::API
    def index_legacy
      params = Users::User.new(allowed_params_to_search).to_h.compact
      users = Users::UserRepository.new.get_users(params, session[:token])
      render json: users
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
