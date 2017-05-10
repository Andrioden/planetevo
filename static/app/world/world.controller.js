app.controller('WorldController', function($rootScope, $scope, $window, Restangular){

    // EVENTS or Methods exposed to other controllers

    $rootScope.$on('species-load', function() {
        loadSpecies();
    });

    $rootScope.$on('species-highlight-show', function(event, specie) {
        addLocationsHighlight(specie.locations);
    });

    $rootScope.$on('species-highlight-remove', function() {
        removeLocationsHighlight();
    });


    // CONSTRUCTOR
    var worldConfig = {
        width: 100,
        height: 100,
        factor: 10,
    };

    $rootScope.species = [];
    loadSpecies();

    canvas = new fabric.Canvas('worldCanvas'); // Unscoped for testing
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
                    left: x(specie.locations[i].x),
                    top: y(specie.locations[i].y),
                    width: worldConfig.factor,
                    height: worldConfig.factor,
                    fill: 'red',
                    opacity: specie.locations[i].a / 100,
                    selectable: false,
                }));
            }
        }

        console.log("Canvas now has object count: " + canvas.getObjects().length);
    }

    var highlightLines = [];

    function addLocationsHighlight(locations) {
        removeLocationsHighlight();

        var minX = Math.min.apply(Math, locations.map(function(location){return location.x;}));
        var maxX = Math.max.apply(Math, locations.map(function(location){return location.x;})) + 1;
        var minY = Math.min.apply(Math, locations.map(function(location){return location.y;})) - 1;
        var maxY = Math.max.apply(Math, locations.map(function(location){return location.y;}));

        highlightLines = drawLinedSquare(minX, maxX, minY, maxY, "yellow");
    }

    function removeLocationsHighlight() {
        for (var i = 0; i < highlightLines.length; i++) {
            highlightLines[i].remove();
        }

        highlightLines = [];
    }

    function drawLinedSquare(minX, maxX, minY, maxY, color) {
        var lines = [];
        lines.push(drawLine(minX, minY, maxX, minY, "yellow", 2));
        lines.push(drawLine(maxX, minY, maxX, maxY, "yellow", 2));
        lines.push(drawLine(maxX, maxY, minX, maxY, "yellow", 2));
        lines.push(drawLine(minX, maxY, minX, minY, "yellow", 2));

        return lines;
    }

    function drawLine(fromX, fromY, toX, toY, color, width) {
        if (!width)
            width = 1;

//        console.log(fromX, fromY, toX, toY, color, width)
//        console.log(x(fromX), y(fromY), x(toX), y(toY), color, width);

        var line = new fabric.Line([x(fromX), y(fromY), x(toX), y(toY)], {
            stroke: color,
            strokeWidth: width,
        });
        canvas.add(line);

        return line;
    }

    function x(serverX) {
        return serverX * worldConfig.factor;
    }

    function y(serverInvertedY) {
        return (worldConfig.height - serverInvertedY) * worldConfig.factor;
    }

});