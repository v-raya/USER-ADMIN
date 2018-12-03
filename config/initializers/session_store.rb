
CountyAdmin::Application.config.session_store CwdsStore::Store, {
	host: ENV.fetch('REDIS_HOST', '127.0.0.1'),
	port: ENV.fetch('REDIS_PORT', '6379')
}
