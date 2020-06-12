

var Stamen_WC = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg', {
  maxZoom: 16,
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var OpenStreetMap_CH = L.tileLayer('https://tile.osm.ch/switzerland/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	bounds: [[45, 5], [48, 11]]
});

var PTTmap1851 = L.tileLayer('http://db.j-images.ch/tileserver/tileserver-php/kurskarte/{z}/{x}/{y}.png', {
  maxZoom: 16,
  attribution: 'PTT'
});


var mymap = L.map('mapid', {
		center: [47.00016, 8.01427],
		zoom: 8,
		layers: [OpenStreetMap_CH]
	});

  var baseLayers = {
  		"Water color": Stamen_WC,
  		"Open Street Map": OpenStreetMap_CH,
      "Karte 1851": PTTmap1851
  	};

  var overLayers = {
      "Karte 1851": PTTmap1851
    };

L.control.layers(baseLayers, overLayers, {
  collasped: false
}).addTo(mymap);

L.control.opacity(
    overLayers,
    {
    label: "Layer Opacity"
    }
).addTo(mymap);

var myIcon = L.icon({
    iconUrl: 'posthorn.png',
    iconSize: [50, 50],
    iconAnchor: [25, 25],
    popupAnchor: [0, 30]
  });

function onEachFeature(feature, layer) {
		var nameToday = feature.properties.nameToday;
    var nameOld = feature.properties.nameOld;
    var GeoNames = feature.properties.URL_GeoNames;
    var HistHub = feature.properties.URL_HistHub;
    var Wikidata = feature.properties.URL_Wikidata;
    var Popupcontents = nameToday + "<br>"

    if (nameOld){
      var TxtNameOld = "Old name: " + nameOld;
      Popupcontents = Popupcontents + "<br>" + TxtNameOld;
    }
    if (GeoNames){
    var TxtGeoNames = "<a href=" + GeoNames + " target='_blank' rel='noopener'>" + "Link to GeoNames" + "</a>";
    Popupcontents = Popupcontents + "<br>" + TxtGeoNames;
    }

    if (HistHub){
      var TxtHistHub = "<a href=" + HistHub + " target='_blank' rel='noopener'>" + "Link to HistHub" + "</a>";
      Popupcontents = Popupcontents + "<br>" + TxtHistHub;
    }

    if (Wikidata){
      var TxtWikidata = "<a href=" + Wikidata + " target='_blank' rel='noopener'>" + "Link to Wikidata" + "</a>";
      Popupcontents = Popupcontents + "<br>" + TxtWikidata;
    }


		layer.bindPopup(Popupcontents);
	}

L.geoJSON(placeName, {
  pointToLayer: function(feature, latlng) {
    var myIcon = new L.icon({
        iconUrl: './posthorn.png',
        iconSize: [50, 50],
        iconAnchor: [25, 50],
        popupAnchor: [0, -20]
      });
      return L.marker(latlng, {icon: myIcon});
  },
  onEachFeature: onEachFeature
}).addTo(mymap);



var popup = L.popup();

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(mymap);
}

mymap.on('click', onMapClick);
