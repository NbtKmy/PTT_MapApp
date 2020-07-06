# PTT MappApp

The PTT MappApp is a web application which should present the digital material created and offered by PTT-Archive in an interactive, playful form for the wide audience. This repository is the result of the [project 6 "PTT - Georeferencing"](https://hack.glam.opendata.ch/project/10) at the GLAMhack2020.<br>
After the GLAMhack2020, I've added some codes written by Kenny & me.<br>
This is the [sample page](http://db.j-images.ch/GLAMhack/GLAMhack.html).

## Participants of the project 6

They are:

- Kenny Floria
- Sarah Stalder
- Heike Bazak
- Nobutake Kamiya
- Luca Thanei

## PTT-Archive

The PTT-Archive collects the historical material on the post, telegraph, and telephone in Switzerland. For further information, please visit the [home page of the PTT-Archive](https://www.mfk.ch/en/ptt-archive/information/about-us/).

## What's in this repository?

There are 4 folders, 3 files written in Javascript, 1 Geojson file, 1 html file, and 1 image file.

- Codes

  - The image file is applied as the marker on the map presented by [Leaflet](https://leafletjs.com/).
  - The HTML file is the internet page on which the features of our application are mounted.
  - The GeoJson file presents the vector layer on the map. This file is created from a Google spreadsheet with a GAS code automatically. The GAS code is in the "gs" folder.
  - getMap.js file calls map layers. With mirador_insert.js the Mirador viewer is implemented. Through placeName.js the geoJson data is got as a vector layer.

- Folders

  - The opacity folder contains the codes from [dayjournal/Leaflet.Control.Opacity](https://github.com/dayjournal/Leaflet.Control.Opacity).
  - The mirador folder contains the [Mirador IIIF viewer](https://projectmirador.org/)(v2.6.0)
  - The iiif folder contains IIIF manifest & annotationlist (according to the IIIF presentation API v2)
  - The gs folder contains the GAS codes.

    - To collect information such as geolocation, place name, and others manually, we used [this Google spreadsheet](https://docs.google.com/spreadsheets/d/1rc5LQUNXg89LShRqoiKYNfFtWIuQmkZQEa6FB0J56h8/edit?usp=sharing)
    - With getDatafromAPI.gs you can get information (longitude, latitude, MAMSL, alternative place names) from WikiData-API and HistHub-API. You need the id of item for the both API.
    - You can get the xywh value for the IIIF image through getXYWHforIIIF.gs
    - 3 other gs codes create geoJson file or IIIF annotation list from a sheet

## Other material

- A raster map layer "Kurskarte 1851" created by [QGIS](https://www.qgis.org/en/site/) is hosted with [Tile Server PHP](https://openmaptiles.org/docs/host/tileserver-php/).
- IIIF image is created through [Omeka S](https://omeka.org/s/).
