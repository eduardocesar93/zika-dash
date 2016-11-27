// List of locals and Zika Rate
neighborhoodMap = {
    test1: {
        center: {lat: -22.813711, lng: -43.208722},
        mosquitoRate: 1000
    },
    test2: {
        center: {lat: -22.902711, lng: -43.207722},
        mosquitoRate: 500
    }
};

// Construct a Polygon.
var constructPolygon = function(coordinates, map){
    var coordinatesFormatted = [];
    for(var i = 0; i < coordinates.length; i++){
        coordinatesFormatted.push({lat: coordinates[i][1], lng: coordinates[i][0]});
    }
    var newArea = new google.maps.Polygon({
        paths: coordinatesFormatted,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 4,
        fillColor: '#FF0000',
        fillOpacity: 0.35
    });
    newArea.setMap(map);
};

// Construct a Circle.
var constructCircles = function(neighborhoodMap, map){
    for (var item in neighborhoodMap) {
        var itemCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            center: neighborhoodMap[item].center,
            radius: Math.sqrt(neighborhoodMap[item].mosquitoRate) * 100
        });
    }
}

// Initialize the google Map
function myMap() {
    var mapCanvas = document.getElementById("map");
    var mapOptions = {
        center: new google.maps.LatLng( -22.8898893, -43.3558075),
        zoom: 10
    }
    var map = new google.maps.Map(mapCanvas, mapOptions);
    constructCircles(neighborhoodMap, map);
}






