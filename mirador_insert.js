      $(function() {
      myMiradorInstance = Mirador({
        "id": "viewer",
        "layout": "1x1",
        "buildPath": "mirador/",
        "data": [{
          manifestUri: "http://db.j-images.ch/GLAMhack/iiif/P-38-2-1851-08/manifest.json",
          location: "PTT"
        }],
        "windowObjects": [{
          loadedManifest: "http://db.j-images.ch/GLAMhack/iiif/P-38-2-1851-08/manifest.json",
          viewType: "ImageView",
          annotationLayer: true
        }],
        "annotationEndpoint": { "name":"Local Storage", "module": "LocalStorageEndpoint" }
      });
    });
