function doGet(request){

  // return JSON text with the appropriate Media Type
  var contents = ContentService.createTextOutput(getGeoJsonfromMv2()).setMimeType(ContentService.MimeType.JSON);
  contents.downloadAsFile('kurskarte.geojson');

  return contents;

}

function getGeoJsonfromMv2() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('mapv2');
  var data = sheet.getDataRange().getValues();
  var result = {};
  result.type = "FeatureCollection";

  var p = [];
  for (var i = 1; i < data.length; i++) {
    var place = {};
    place.type = "Feature";

    //geometry
    geometry = {};
    geometry.type = "Point";
    coordinates = [];
    coordinates[0] = Number(data[i][5]);
    coordinates[1] = Number(data[i][4]);
    geometry.coordinates = coordinates;
    place.geometry = geometry;

    //properties
    properties = {};
    properties.Id = data[i][0];
    properties.nameToday = data[i][1];
    properties.nameOld = data[i][2];
    properties.year = data[i][7];
    properties.GeoNamesID = data[i][9];
    properties.HistHubID = data[i][10];
    properties.WikidataID = data[i][11];

    var hls = data[i][8];
    if (hls){
    properties.hlsLink = "https://hls-dhs-dss.ch/de/articles/" + hls;
    }
    else {
    properties.hlsLink = "";
    }

    place.properties = properties;

    p.push(place);
  }
  result.features = p;
  return JSON.stringify(result);
}
