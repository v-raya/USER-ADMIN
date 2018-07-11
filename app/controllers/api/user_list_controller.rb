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
      user_hash = Users::User.new(allowed_params_to_search).to_h.compact

      es_query_json = get_query_hash(user_hash)
      logger.debug "elastic_search query: #{es_query_json}"
      users = Users::User.search(es_query_json, session[:token])
      @users_response = collect_users(users)
      render json: @users_response, status: :ok
    end

    private

    def collect_users(users)
      users[:hits][:hits].collect { |user| user[:_source] }
    end

    def assign_page_params
      page_params = {}
      page_params['size_params'] = params[:size]
      page_params['from_params'] = params[:from]
      page_params['sort_params'] = params[:sort]
      page_params['order_params'] = params[:order]
      page_params
    end

    def get_query_hash(user_hash)
      query = QueryPreprocessor.form_params_to_query_params(user_hash)
      page_params = assign_page_params
      query_hash = {}
      query_hash = QueryPreprocessor.params_to_query_with_types(query) unless query.empty?
      Elastic::QueryBuilder.user_search_v1(query_hash, page_params)
    end

    def allowed_params_to_search
      params.permit(:last_name, :format).to_h
    end
  end
end
