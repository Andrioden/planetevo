app.controller('MenuController', function($rootScope, $scope, $mdDialog, Restangular, $http){

    // CONSTRUCTOR

    $scope.showCreateSpecieDialog = function(ev) {
        $mdDialog.show({
            controller: createSpecieDialogController,
            templateUrl: 'static/app/menu/createSpecieDialog.template.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: false // Only for -xs, -sm breakpoints.
        })
        .then(function() {
            // Return from dialog
        }, function() {
            // Closed dialog
        });
    };

    $scope.clickedSpecie = function(ev, specie) {
        $rootScope.$emit('species-highlight-show', specie);

        $mdDialog.show({
            controller: specieDialogController,
            templateUrl: 'static/app/menu/specieDialog.template.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: false, // Only for -xs, -sm breakpoints.
            locals: { specie: specie },
        })
        .then(function() {
            // Return from dialog
        }, function() {
            // Closed dialog
            $rootScope.$emit('species-highlight-remove', specie);
        });
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

    function specieDialogController($scope, $mdDialog, specie) {

        $scope.specie = specie;

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

    }

});