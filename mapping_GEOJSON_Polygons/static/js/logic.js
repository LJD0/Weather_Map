// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streetmap = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_KEY
});
let satelliteMap = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_KEY
});

let baseMaps = {
    Street: streetmap,
    Satellite: satelliteMap
}

// Create the map object with center and zoom level.
let map = L.map('mapid', {
    center:[43.7,-79.3],
    zoom: 11,
    layers: streetmap
});

L.control.layers(baseMaps).addTo(map)

// Then we add our 'graymap' tile layer to the map.

// Accessing the airport GeoJSON URL
let torontoData = "https://raw.githubusercontent.com/LJD0/Mapping_Earthquakes/Mapping_geoJSON_Polygons/mapping_GEOJSON_Polygons/torontoNeighborhoods.json";

let myStyle = {
    color: 'blue',
    weight: 1,
    fillColor: 'yellow'
    }

// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
    console.log(data);
    let newnew = data.features
    createFeatures(newnew)
});

function createFeatures(feat) {

    function onEachFeature(feature,layer) {
        layer.bindPopup("<h3>Neighborhood: " + feature.properties.AREA_NAME +"</h3>")
    }



// Creating a GeoJSON layer with the retrieved data.
    varvar = L.geoJSON(feat, {
        onEachFeature : onEachFeature,
        style: myStyle
    }).addTo(map);

}