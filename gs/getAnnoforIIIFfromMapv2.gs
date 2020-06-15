function doGet(request){

  // return JSON text with the appropriate Media Type
  var contents = ContentService.createTextOutput(getAnnofromMv2()).setMimeType(ContentService.MimeType.JSON);
  contents.downloadAsFile('annotation1.json');

  return contents;

}

function getAnnofromMv2() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('mapv2');
  const data = sheet.getDataRange().getValues();

  var result = {};

  result.key_context = "http://iiif.io/api/presentation/2/context.json";
  result.key_id = "http://db.j-images.ch/GLAMhack/iiif/P-38-2-1851-08/list/annotation1.json";
  result.key_type = "sc:AnnotationList";

  var p = [];
  for (var i = 1; i < data.length; i++) {
    var xywh = String(data[i][16]);
    if (xywh) {

    var anno = {};
    var anno_id = "http://P-38-2-1851-08_annotation/Anno_item/" + i + "/anno.json";
    anno.key_id = anno_id;
    anno.key_type = "oa:Annotation";
    anno.motivation = "sc:painting";
    anno.pttID = data[i][0];

    //resource
    var resource = [];
    resource[0] = {};
    resource[0].key_type = "cnt:ContentAsText";
    resource[0].format = "text/plain";
    var text = "<p>" + data[i][1] + "</p>" + "<br>" + data[i][7] + "<br>";
    if (data[i][10]){
    text = text + "Alternative names: " + data[i][3] + "<br>";
    }
    if (data[i][8]){
    var link = "https://hls-dhs-dss.ch/de/articles/" + String(data[i][8]);
    var iframeTxt = "<iframe width='400' height='300' src='" + link + "'></iframe>";
    text = text + iframeTxt;
    }

    resource[0].chars = text;
    anno.resource = resource;


    anno.on = "http://db.j-images.ch/GLAMhack/iiif/P-38-2-1851-08/canvas/p1#xywh=" + xywh;


    p.push(anno);
  }
  else {
  continue;
  }
  }
  result.resources = p;



  return JSON.stringify(result);
}
