(function(ang) {

	var app = ang.module('app');

	app.directive('appContainer', function() {
		return {
			templateUrl: 'app/main.html',
			controller: 'appContainer'
		};
	});

})(angular)