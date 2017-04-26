app.controller('WorldController', function($rootScope, $scope){

    // CONSTRUCTOR
    var canvas = new fabric.Canvas('worldCanvas');
    canvas.setBackgroundColor('blue', canvas.renderAll.bind(canvas));

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

});