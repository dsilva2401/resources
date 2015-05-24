(function(ang) {

	var app = ang.module('app');

	app.config(['$resourcesProvider', function($resourcesProvider) {

		// Resources Config
			$resourcesProvider.init({
				httpConfig: {
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
						'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'
					}
				},
				// domain: 'http://123.45.6.78:3000',
				domain: 'http://localhost:1234',
				resources: {

					Entities: {
						route: '/api/entity/:entityId'
					},

					Workers: {
						route: '/api/entity/:entityId/worker/:workerId'
					}

				}
			});

	}]);

})(angular)