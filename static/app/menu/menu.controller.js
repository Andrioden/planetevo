app.controller('MenuController', function($rootScope, $scope, $mdDialog, Restangular){

    // CONSTRUCTOR

    $scope.showCreateSpecieDialog = function(ev) {
        $mdDialog.show({
            controller: CreateSpecieDialogController,
            templateUrl: 'static/app/menu/createSpecieDialog.template.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: false // Only for -xs, -sm breakpoints.
        })
        .then(function() {
            // Return from dialog
        }, function() {
            // Closed dialog
        });
    };

    $scope.clickedSpecie = function(specie) {
        console.log("Clicked " + specie.name);
    }


    // PRIVATE FUNCTIONS

    function CreateSpecieDialogController($scope, $mdDialog) {

        $scope.specie = {
            name: ""
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.create = function() {
            console.log("Creating specie with name: " + $scope.specie.name);

            $scope.submitting = true;

            Restangular.all("specie").post($scope.specie).then(
                function (response) { //success
                    $scope.submitting = false;
                    console.log(response.specie);
                    $rootScope.species.push(response.specie);
                    $mdDialog.hide();
                },
                function errorCallback() { //error
                    requestFailed(error);
                    $scope.submitting = false;
                }
            );
        };
    }

});