function getDatafromAPI() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('mapv2');
  const data = sheet.getDataRange().getValues();


  for (let i = 1; i < data.length; i++){
  //URL von Wikidata API
  var wikiID = data[i][11];
  if (wikiID){
  var WikiLink = "https://www.wikidata.org/wiki/Special:EntityData/" + wikiID + ".json";

  var Wikijson = UrlFetchApp.fetch(WikiLink).getContentText();
  var WikiData = JSON.parse(Wikijson);

  //Get lat & lon from Wikidata     entities - claims - P625[0] - mainsnak - datavalue - value - latitude & longitude
  var lat = WikiData['entities'][wikiID]['claims']['P625'][0]['mainsnak']['datavalue']['value']['latitude'];
  var lon = WikiData['entities'][wikiID]['claims']['P625'][0]['mainsnak']['datavalue']['value']['longitude'];

  sheet.getRange(i+1,5).setValue(String(lat));
  sheet.getRange(i+1,6).setValue(String(lon));
  }

  //Get Histhub - alternative names
  var histhub_ID = data[i][10];

  if (histhub_ID){
  var histLink = "https://data.histhub.ch/api/place/" + histhub_ID;


  var histJson = UrlFetchApp.fetch(histLink).getContentText();
  var histData = JSON.parse(histJson);

  var histNames = histData['names'];

      if(histNames){
        var len = histNames.length;
        var names = [];
          for (var j = 0; j < len; j++){
          var n = histNames[j]['name'];
          names.push(n);
          }
        var strNames = names.join(',');
        sheet.getRange(i+1,4).setValue(strNames);
        }
      }
    }
  }
