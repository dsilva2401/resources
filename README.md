# Resources module


## Install

```bash
bower install resources
```
or download [link](https://raw.githubusercontent.com/dsilva2401/resources/master/dist/resources.min.js)

Import script
```html
<script src="/bower_components/resources/dist/resources.min.js"></script>
```
Import module
```js
var app = angular.module('myApp', ['resources']);
```

## Usage

#### Init config

```js
app.config( ['$resourcesProvider', function ($resourcesProvider) {
    $resourcesProvider.init({
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
```

#### Call resource

```js
app.controller('myController', ['$scope', '$resources', function ($scope, $resources) {
  
    $resources.Entities.get().then(function (resp) {
        console.log(resp) // Return all entities from /api/entity/
    });
  
}]);
```

## Api

#### `$resourcesProvider.init(config)`

`config` attributes

**Attribute** | **Type**
--- | ---
`httpConfig` | *`Object`*
`domain` | *`String`*
`resources` | *`object`*

- `httpConfig` Sets http request configuration

*Example*
```js
$resourcesProvider.init({
    httpConfig: {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'
        }
    },
    // More options..
});
```


- `domain` Set domain for requests

*Example*
```js
$resourcesProvider.init({
    domain: 'http://123.45.6.78',
    // More options..
});
```


- `resources` Set resources

*Example*
```js
$resourcesProvider.init({
    resources: {

        Entities: {
            route: '/api/entity/:entityId'
        },

        Workers: {
            route: '/api/entity/:entityId/worker/:workerId'
        }

    }
    // More options..
});
```

#### `$resources`
Provide all resources set before, in this case `$resources.Entities` and `$resources.Workers`, each resources have methods `GET`, `POST`, `PUT` and `DELETE`.

*Example*
```js
// Get and display all entities
// GET => /api/entity
$resources.Entity.get().then(function (entities) {
    console.log(entities);
}).catch(function (error) {
    console.error(error);
});
```

Each method can receive and object with two attributes: `urlParams` and `data`.

##### *`urlParams`*

Replace parameters passed in resource route

*Example*
```js
// Get and display all workers from entity with id 123
// GET => /api/entity/123/worker
$resources.Workers.get({
    urlParams: { entityId: 123 }
}).then(function (workers) {
    console.log(workers);
}).catch(function (error) {
    console.error(error);
});
```


##### *`data`*

Sends data to resource

*Example*
```js
// Create a worker in entity with id 123
// POST => /api/entity/123/worker
$resources.Workers.post({
    urlParams: { entityId: 123 },
    data: { name: 'John Smith', email: 'johnsmith@gmail.com' }
}).then(function (worker) {
    console.log(worker); // Display created worker
}).catch(function (error) {
    console.error(error);
});
```
