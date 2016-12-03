// List of locals and Zika Rate
neighborhoodMap = {
    'MADUREIRA': 2000,
    'MARECHAL HERMES': 1000};

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
    $.ajax({
        url: "zika-por-bairro",
        dataType: "json",
        success: function(data) {
            for (var item in data) {
                var geocoder =  new google.maps.Geocoder();
                geocoder.geocode( { 'address': item + "Rio de Janeiro" }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var itemCircle = new google.maps.Circle({
                            strokeColor: '#FF0000',
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                            fillColor: '#FF0000',
                            fillOpacity: 0.35,
                            map: map,
                            center: {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()},
                            radius: 200
                        });
                    }
                    else{
                        console.log("error in " + item);
                        alert(item);
                    }
                });
            }
        }
    });
}

// Initialize the google Map
function myMap() {
    var mapCanvas = document.getElementById("map");
    var mapOptions = {
        center: new google.maps.LatLng( -22.8898893, -43.3558075),
        zoom: 11
    }
    var map = new google.maps.Map(mapCanvas, mapOptions);
    constructCircles(neighborhoodMap, map);
}






