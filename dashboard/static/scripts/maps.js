// List of locals and Zika Rate
neighborhoodMap = {
    'MADUREIRA': 2000,
    'MARECHAL HERMES': 1000
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

function someFunction(map, addresses, callback) {
    var coords = [];
    var radius = [];
    for(var item in addresses) {
        currItem = item;
        currValue = addresses[item];
        var geocoder = new google.maps.Geocoder();
        if (geocoder) {
            geocoder.geocode({'address':currItem + " Rio de Janeiro"}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    coords.push({lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()});
                    if(coords.length == addresses.length) {
                        if( typeof callback == 'function' ) {
                            callback(coords, radius);
                        }
                    }
                }
                else {
                    throw('No results found: ' + status);
                }
            });
        }
     }
  }

// Construct a Circle.
var constructCircles = function(map){

}

// Initialize the google Map
function myMap() {
    var mapCanvas = document.getElementById("map");
    var mapOptions = {
        center: new google.maps.LatLng( -22.8898893, -43.3558075),
        zoom: 11
    }
    var map = new google.maps.Map(mapCanvas, mapOptions);
     $.ajax({
        url: "zika-por-bairro",
        dataType: "json",
        async: false,
        success: function(data){someFunction(map, data, function(coords, radius) {
        for (var i = 0; i < coords.length; i++) {
            var itemCircle = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: map,
                center: coords[i],
                radius: radius[i],
            });
        }
    })}
    });
}






