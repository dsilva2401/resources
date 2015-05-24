(function(ang) {

	var module = ang.module('resources', []);

	module.factory('Resources', ['$http', '$q', '$filter', function ($http, $q, $filter) {

		/**
			@param config.httpConfig OBJECT
			@param config.domain STRING
			@param config.resources OBJECT
				@attr route STRING
				@attr filter STRING
		*/
		return function (config) {
			// Attributes
				var domain = config.domain || '',
					resources = config.resources || {},
					httpConfig = config.httpConfig || {},
					self = this,
					availableMethods = ['GET', 'POST', 'PUT', 'DELETE'];

			// Methods
				self._processUrl = function (url, params) {
					if (!params) params = {};
					var urlParams = (url.match(/\:([a-zA-Z])+/g) || []);
					urlParams.forEach(function(param) {
						param = param.substring(1,param.length);
						if (!params[param]) {
							url = url.replace(':'+param+'/', '');
							url = url.replace(':'+param, '');
							return;
						}
						// url = url.replace(':'+param+'/', params[param]);
						url = url.replace(':'+param, params[param]);
					});
					return url;
				}

				self._getResourceObject = function (resourceName) {
					var r = resources[resourceName];
					var methods = {};
					availableMethods.forEach(function (m) {
						methods[m.toLowerCase()] = function(opts) {
							opts = opts || {};
							var deferred = $q.defer();
							var resHttpConf = {
								method: m,
								url: self._processUrl( domain+resources[resourceName].route, opts.urlParams || {} ),
								data: opts.data || {}
							};
							for (var conf in httpConfig) {
								resHttpConf[conf] = httpConfig[conf];
							}
							$http(resHttpConf).success(function (data, status, headers, config) {
								// data = resources[resourceName].filter ? $filter(resources[resourceName].filter)(data) : data;
								deferred.resolve({
									data: data,
									status: status,
									headers: headers, 
									config: config
								});
							}).error(function (data, status, headers, config) {
								deferred.reject({
									data: data,
									status: status,
									headers: headers, 
									config: config
								});
							});
							return deferred.promise;
						}
					});
					return methods;
				}

			// Init
				for (var k in resources) {
					self[k] = self._getResourceObject(k);
				}


		}
	}]);

	module.factory('$resources', ['Resources', function (Resources) {
		return new Resources();
	}]);

	module.provider('$resources', function () {
		var config;
		this.init = function (conf) {
			config = conf;
		}
		this.$get = ['Resources', function (Resources) {
			return new Resources(config);
		}]
	});

})(angular)