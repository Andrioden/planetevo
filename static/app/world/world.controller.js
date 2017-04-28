app.controller('WorldController', function($rootScope, $scope, $window, Restangular){

    // CONSTRUCTOR

    $rootScope.species = Restangular.all("specie").getList().$object;
    console.log($rootScope.species);

    var canvas = new fabric.Canvas('worldCanvas');
    canvas.setBackgroundColor('blue', canvas.renderAll.bind(canvas));
    canvas.setDimensions({ width: 200, height: 200})

    setDimensionsAccordingToWindowSize();

    $(window).resize(function(){
        $scope.$apply(function(){
            setDimensionsAccordingToWindowSize();
        });
    });

    // create a rectangle object
    var rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 20,
      height: 20
    });

    // "add" rectangle onto canvas
    canvas.add(rect);

    // EXPOSED ACTIONS FOR HTML

    // PRIVATE FUNCTIONS

    function setDimensionsAccordingToWindowSize() {
        canvas.setDimensions({ width: $window.innerWidth, height: $window.innerHeight})
    }
});