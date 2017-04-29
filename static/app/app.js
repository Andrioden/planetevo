var app = angular.module('PlanetEvo', ['ngMaterial', 'restangular']);

app.config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl("/api");
    RestangularProvider.setRequestSuffix('/');
});

function requestFailed(error) {
    console.log("Error: " + error.error_message);
    DebugLastErrorObject = error;
}