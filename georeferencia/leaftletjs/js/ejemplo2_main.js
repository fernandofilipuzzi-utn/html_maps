
// #region inicializaciones de constantes
var options = { enableHighAccuracy: true, maximumAge: 100, timeout: 10000 };
let c = {lat:-37.0638296, lng:-61.9403603};

const LeafIcon = L.Icon.extend({
    options: {
        shadowUrl: 'img/leaf-shadow.png',
        iconSize: [38, 95],
        shadowSize: [50, 64],
        iconAnchor: [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor: [-3, -76]
    }
});

const map = L.map('map').setView([c.lat, c.long], 13);

const greenIcon = new LeafIcon({ iconUrl: 'img/leaf-green.png' });
const redIcon = new LeafIcon({ iconUrl: 'img/leaf-red.png' });
const orangeIcon = new LeafIcon({ iconUrl: 'img/leaf-orange.png' });
// #endregion

// #region inicializar mapa
map.locate({ setView: true, maxZoom: 16, zoomControl: true });
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
//#endregion

// #region geolocalizacion
if(!navigator.geolocation)
{
    //[violation] only request geolocation information in response to a user gesture
    console.log("tu navegador no suporta geolocalización");
}
else
{
    setInterval(() => 
        {
            navigator.geolocation.getCurrentPosition(getPosition,getPositionError, options);
        }, 2000);
}
// #endregion

// #region utilidades
function addMarker(L, map, element) 
{
    const icon = element.icon ? element.icon : null;

    if (icon) 
    {
        const mark = L.marker(element.c, { icon: icon }).bindPopup(element.message).addTo(map);
        return mark;
    }
    else 
    {
        const mark = L.marker(element.c).bindPopup(element.message).addTo(map);
        return mark;
    }
}

// #endregion

// #region
var marker, circle;

function getPosition(position) 
{
    console.log(position)
    var lat = position.coords.latitude
    var long = position.coords.longitude
    var accuracy = position.coords.accuracy

    if (marker) 
    {
        map.removeLayer(marker);
    }

    console.log(lat, long, accuracy);

    addMarker(L, map, { c: [lat, long], message: 'yo!' });
}

function getPositionError(error) 
{
    alert(error.message);
}
// #endregion