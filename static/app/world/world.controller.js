app.controller('WorldController', function($rootScope, $scope, $window, Restangular){

    // EVENTS

    $rootScope.$on('species-load', function(event, args) {
        loadSpecies();
    });


    // CONSTRUCTOR
    var worldConfig = {
        width: 100,
        height: 100,
        factor: 10,
    };

    $rootScope.species = [];
    loadSpecies();

    var canvas = new fabric.Canvas('worldCanvas');
    canvas.setDimensions({ width: worldConfig.width * worldConfig.factor, height: worldConfig.height * worldConfig.factor });

    setDimensionsAccordingToWindowSize();

    $(window).resize(function(){
        $scope.$apply(function(){
            setDimensionsAccordingToWindowSize();
        });
    });


    // EXPOSED ACTIONS FOR HTML

    // PRIVATE FUNCTIONS

    function loadSpecies() {
        Restangular.all("specie").getList().then(
            function (response) { //success
                $rootScope.species = response.plain();
                drawSpecies($rootScope.species);
            },
            function errorCallback() { //error
            }
        );
    }

    function setDimensionsAccordingToWindowSize() {
        canvas.setDimensions({ width: $window.innerWidth, height: $window.innerHeight})
    }

    function drawSpecies(species) {
        canvas.clear();

        canvas.setBackgroundColor('blue', canvas.renderAll.bind(canvas));

        for (var s = 0; s < species.length; s++) {
            var specie = species[s];
            console.log(specie);
            for (var i = 0; i < specie.locations.length; i++) {
                console.log(specie.locations[i])
                canvas.add(new fabric.Rect({
                    left: specie.locations[i].x * worldConfig.factor,
                    top: (worldConfig.height - specie.locations[i].y) * worldConfig.factor,
                    fill: 'red',
                    opacity: specie.locations[i].a / 100,
                    width: worldConfig.factor,
                    height: worldConfig.factor,
                    selectable: false,
                }));
            }
        }

        console.log("Canvas now has object count: " + canvas.getObjects().length);
    }

});