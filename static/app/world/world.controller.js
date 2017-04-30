app.controller('WorldController', function($rootScope, $scope, $window, Restangular){

    // CONSTRUCTOR
    var worldConfig = {
        width: 100,
        height: 100,
        factor: 10,
    };

    $rootScope.species = [];

    var canvas = new fabric.Canvas('worldCanvas');
    canvas.setBackgroundColor('blue', canvas.renderAll.bind(canvas));
    canvas.setDimensions({ width: worldConfig.width * worldConfig.factor, height: worldConfig.height * worldConfig.factor });

//    canvas.on('mouse:down', function(options) {
//        if (options.target) {
//            console.log('an object was clicked! ', options.target.specie);
//        }
//    });

    setDimensionsAccordingToWindowSize();

    $(window).resize(function(){
        $scope.$apply(function(){
            setDimensionsAccordingToWindowSize();
        });
    });

    Restangular.all("specie").getList().then(
        function (response) { //success
            $rootScope.species = response.plain();
            drawSpecies($rootScope.species);
        },
        function errorCallback() { //error
        }
    );


    // EXPOSED ACTIONS FOR HTML

    // PRIVATE FUNCTIONS

    function setDimensionsAccordingToWindowSize() {
        canvas.setDimensions({ width: $window.innerWidth, height: $window.innerHeight})
    }

//    function drawBorder() {
//        var path = new fabric.Path('M 0 0 L 200 100 L 170 200 z');
//        path.set({ left: 120, top: 120 });
//        canvas.add(path);
//
////        canvas.add(new fabric.Rect({
////            left: 0,
////            top: 0,
////            fill: 'blue',
////            width: worldConfig.width * worldConfig.factor,
////            height: worldConfig.height * worldConfig.factor,
////        }));
//    }


    function drawSpecies(species) {
        for (var s = 0; s < species.length; s++) {
            var specie = species[s];
            console.log(specie);
            for (var i = 0; i < specie.locations.length; i++) {
                console.log(specie.locations[i])
                canvas.add(new fabric.Rect({
                    left: specie.locations[i].x * worldConfig.factor,
                    top: (worldConfig.height - specie.locations[i].y) * worldConfig.factor,
                    fill: 'red',
                    width: worldConfig.factor,
                    height: worldConfig.factor,
                    selectable: false,
                }));
            }
        }
    }

});