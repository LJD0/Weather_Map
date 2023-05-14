// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let lightmap = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_KEY
});
let darkmap = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_KEY
});

let baseMaps = {
    Day: lightmap,
    Night: darkmap
}

// Create the map object with center and zoom level.
let map = L.map('mapid', {
    center:[44,-80],
    zoom: 5,
    layers: darkmap
});

L.control.layers(baseMaps).addTo(map)

// Then we add our 'graymap' tile layer to the map.

// Accessing the airport GeoJSON URL
let torontoData = "https://raw.githubusercontent.com/LJD0/Mapping_Earthquakes/Mapping_geoJSON_Linestrings/mapping_GEOJSON_Linestrings/torontoRoutes.json";
let toronto2 = "*/*/torontoRoutes.json"

let myStyle = {
    weight: .2,
    color: 'yellow'
    }

// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
    console.log(data);
    let newnew = data.features
    createFeatures(newnew)
});

function createFeatures(feat) {

    function onEachFeature(feature,layer) {
        layer.bindPopup("<h3>Airline: " + feature.properties.airline +"</h3><hr><p>Destination: "+ feature.properties.dst+"</p>")
    }



// Creating a GeoJSON layer with the retrieved data.
    varvar = L.geoJSON(feat, {
        onEachFeature : onEachFeature,
        style: myStyle
    }).addTo(map);

}