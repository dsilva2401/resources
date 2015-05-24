(function(ang) {

	var app = ang.module('app');

	app.controller('appContainer', ['$scope', '$resources', function($scope, $resources) {

		// Get all entities
			$resources.Entities.get().then(function (resp) {
				console.log(resp)
			}).catch(function (resp) {
				console.log(resp)
			});

		// Get all workers from entity 123
			$resources.Workers.get({
				urlParams: {
					entityId: 123
				}
			}).then(function (resp) {
				console.log(resp)
			}).catch(function (resp) {
				console.log(resp)
			});

	}]);

})(angular)