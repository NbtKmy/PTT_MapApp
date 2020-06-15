function doGet(request){

  // return JSON text with the appropriate Media Type
  var contents = ContentService.createTextOutput(getGeoJson()).setMimeType(ContentService.MimeType.JSON);
  contents.downloadAsFile('kurskarte.geojson');

  return contents;

}

function getGeoJson() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('only map');
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
    coordinates[0] = Number(data[i][4]);
    coordinates[1] = Number(data[i][3]);
    geometry.coordinates = coordinates;
    place.geometry = geometry;

    //properties
    properties = {};
    properties.nameToday = data[i][1];
    properties.nameOld = data[i][2];
    properties.URL_GeoNames = data[i][7];
    properties.URL_HistHub = data[i][8];
    properties.URL_Wikidata = data[i][9];
    properties.xywh = data[i][10];
    place.properties = properties;

    p.push(place);
  }
  result.features = p;
  return JSON.stringify(result);
}
