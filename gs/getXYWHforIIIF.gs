function forIIIF() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('mapv2');
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {

  var i_x = data[i][12],
      i_y = data[i][13],
      i_w = data[i][14],
      i_h = data[i][15];

    if (i_x){
    var x = Math.round(i_x * 0.5),
        y = Math.round(i_y * 0.5),
        w = Math.round(i_w * 0.5),
        h = Math.round(i_h * 0.5);

    var xywh = String(x + "," + y + "," + w + "," + h);
    sheet.getRange(i+1,17).setValue(xywh);
    }
    else {
      continue;
    }
  }
 }
