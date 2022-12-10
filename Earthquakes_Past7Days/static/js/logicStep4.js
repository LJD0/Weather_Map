// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layers that will be the background of our map.
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

// Create the earthquake layer for our map.
let earthquakes = new L.layerGroup();

// We define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
    Earthquakes: earthquakes
    };

// Create the map object with center and zoom level.
let map = L.map('mapid', {
    center:[39.5, -98.5],
    zoom: 3,
    layers: streetmap
});

L.control.layers(baseMaps,overlays).addTo(map)


let earthquakeData = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

// Grabbing our GeoJSON data.
d3.json(earthquakeData).then(function(data) {
    let mapMakerData = data.features
    createFeatures(mapMakerData)
});

function createFeatures(feat) {

    // This function determines the color of the circle based on the magnitude of the earthquake.
function getColor(magnitude) {
    if (magnitude > 5) {
        return "#ea2c2c";
    }
    if (magnitude > 4) {
        return "#ea822c";
    }
    if (magnitude > 3) {
        return "#ee9c00";
    }
    if (magnitude > 2) {
        return "#eecc00";
    }
    if (magnitude > 1) {
        return "#d4ee00";
    }
    return "#98ee00";
}

    function onEachFeature(feature,layer) {
        layer.bindPopup("<h3>Magnitude: " + feature.properties.mag +"</h3><p>"+"Location: " +feature.properties.place + "</p>")
    };

    function pointToLayer(feature,latlng) {
        return L.circleMarker(latlng,{
            color: 'black',
            radius: (feature.properties.mag+1)*2,
            opacity: 1,
            fillOpacity: .5,
            fillColor: getColor(feature.properties.mag),
            stroke: true,
            weight: 0.5
        });
    }

// Creating a GeoJSON layer with the retrieved data.
    earthquake = L.geoJSON(feat, {
        onEachFeature : onEachFeature,
        pointToLayer : pointToLayer
        }).addTo(earthquakes);
    
        earthquakes.addTo(map)
};