app.controller('MenuController', function($rootScope, $scope, $mdDialog, Restangular, $http){

    // CONSTRUCTOR

    $scope.showCreateSpecieDialog = function(ev) {
        $mdDialog.show({
            controller: createSpecieDialogController,
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

    $scope.tick = function() {
        $http.get('/cron/tick', {}).then(
            function() { //success
                console.log("lol");
                $rootScope.$emit('species-load');
            },
            function() { //error
            }
        );
    }


    // PRIVATE FUNCTIONS

    function createSpecieDialogController($scope, $mdDialog) {

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
                    console.log(response.plain());
                    $rootScope.species.push(response.plain());
                    $mdDialog.hide();
                },
                function errorCallback() { //error
                    $scope.submitting = false;
                }
            );
        };
    }

});