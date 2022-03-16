var locationMap = L.map('locationMap').setView([51.505, -0.09], 13);

var guessMap = L.map('guessMap').setView([51.505, -0.09], 3);

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 19,
    minZoom: 9
});

var Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
});

Esri_WorldImagery.addTo(locationMap);
Esri_WorldStreetMap.addTo(guessMap)

var randomIndex = Math.round(Math.random()*(locations.length-1));
console.log(randomIndex)

var chosenLat = locations[randomIndex].Latitude;
var chosenLong = locations[randomIndex].Longitude;

var locationMarker = L.marker([chosenLat, chosenLong],{}).addTo(locationMap);

// set the view
locationMap.setView([chosenLat, chosenLong], 16);

console.log(locations[randomIndex]);

var guessMarker;

function onGuess(e){
    if (guessMarker!=null){
        guessMap.removeLayer(guessMarker);
    }
    guessMarker = L.marker(e.latlng);
    guessMap.addLayer(guessMarker);
}


guessMap.on('click', onGuess);


function submitGuess(){
    var distance = Math.sqrt(Math.pow((chosenLat-guessMarker.getLatLng().lat), 2) + Math.pow((chosenLong-guessMarker.getLatLng().lng), 2))
    distance = distance * 111.111
    console.log(distance + "km")


    

    var greenZone = L.circle(locationMarker.getLatLng(),{
        color: 'green',
        fillOpacity: 0.2,
        radius: 10000
    }).addTo(locationMap);

    var yellowZone = L.circle(locationMarker.getLatLng(),{
        color: 'yellow',
        fillOpacity: 0.2,
        radius: 1000
    }).addTo(locationMap);

    var redZone = L.circle(locationMarker.getLatLng(),{
        color: 'red',
        fillOpacity: 0.2,
        radius: 100
    }).addTo(locationMap);

    var finalGuessCircle = L.circle(locationMarker.getLatLng(),{
        color: 'black',
        fillOpacity: 1,
        radius: 5
    }).addTo(locationMap);

    locationMap.removeLayer(locationMarker)

    L.marker(guessMarker.getLatLng()).addTo(locationMap);

    var button = document.getElementById("mapSize")
    button.onclick = function(){window.location.reload();}
    button.textContent = distance.toFixed(3) + " km away --- The location was " + locations[randomIndex].Capital + ", " + locations[randomIndex].Country + " --- Click here to play again"
}