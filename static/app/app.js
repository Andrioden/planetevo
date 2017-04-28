var app = angular.module('PlanetEvo', ['ngMaterial', 'restangular']);

app.config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl("/api");
    RestangularProvider.setRequestSuffix('/');
});

//app.config(['$resourceProvider', function($resourceProvider) {
//  // Don't strip trailing slashes from calculated URLs
//  $resourceProvider.defaults.stripTrailingSlashes = false;
//}]);
//
//app
//    .factory('Specie', function ($resource) {
//        return $resource('/api/specie/:specie_id', { specie_id: '@specieId' }, { });
//    });

function requestFailed(error) {
    console.log("Error: " + error.error_message);
    DebugLastErrorObject = error;
}