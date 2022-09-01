import React, {useState, useEffect} from 'react';
import '@turf/turf';
import L from 'leaflet';
import {intersect} from "@turf/turf";
import {MapContainer, TileLayer} from 'react-leaflet';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import  '../../Leaflet.Editable';
import {area, polygon} from "@turf/turf";

let polygons = [], polygonsIntersect = [], usedTypes = [];
const DTMap = (props) => {
    const [map, setMap] = useState(null);

    useEffect(() => {
        if (map != null){
            if (polygons.length > 0)
                polygons.map((element) => element.disableEdit());
            if (!usedTypes.includes(props.pinType.color))
                addPolygon();
        }

    }, [props.pinType]);

    useEffect(() => {
        if (map != null && polygons.length > 0) {
            // eslint-disable-next-line array-callback-return
            polygons.map((element) => {
                if (props.isRemoveButtonActive)
                    element.on('click', function () {
                        removePolygon(element);
                    })
                else{
                    element.removeEventListener('click');
                }
            })
        }
    },  [props.isRemoveButtonActive])

    const addPolygon = () => {
        let polygon = map.editTools.startPolygon(null, {color: props.pinType.color});
        polygon.on('dblclick', function () {
            polygon.toggleEdit();
        });
        polygon.on('editable:disable', function () {
            if (polygons.length > 1)
                addIntersectionPolygon();
            alert(getCulturePolygonArea());
        });
        polygon.on('editable:enable', function () {
            if (polygonsIntersect.length > 0){
               removeAllIntersectionPolygons();
            }
        })
        if (props.pinType.color === 'yellow')
            usedTypes.push(props.pinType.color);
        polygons.push(polygon);
    }

    const removeAllIntersectionPolygons = () => {
        polygonsIntersect.splice(0, polygonsIntersect.length);
    }

    const addIntersectionPolygon = () => {
        let tPolygons = [];
        polygons.map((el) => tPolygons.push(convertLPolygonToTPolygon(el)));
        let intersectionPoints = intersect(...tPolygons).geometry.coordinates;
        let intersection = L.polygon(intersectionPoints);
        polygonsIntersect.push(intersection);
    }

    const convertLPolygonToTPolygon = (figure) => {
        let figurePoints = [];
        figure.getLatLngs()[0].map((el) => figurePoints.push([el.lat, el.lng]));
        figurePoints.push(figurePoints[0]);
        return polygon([figurePoints]);
    }

    const getCulturePolygonArea = () => {
        let intersectionPolygonsArea = 0;
        let culturePolygon;
        let culturePolygonArea;

        if (polygonsIntersect.length !== 0)
            polygonsIntersect.map((el) => {
                intersectionPolygonsArea += area(convertLPolygonToTPolygon(el));
                return null;
            })
        else
            intersectionPolygonsArea = 0;

        if (polygons.length > 0)
            culturePolygon = polygons.find((element) => {
                return element.options.color === 'yellow';
            })

        if (typeof culturePolygon !== 'undefined')
            culturePolygonArea = getPolygonArea(culturePolygon)
        else
            return 0;

        return culturePolygonArea - intersectionPolygonsArea;
    }

    const getPolygonArea = (figure) => {
        return area(convertLPolygonToTPolygon(figure));
    }

    const removePolygon = (polygon) => {
            map.removeLayer(polygon);
    }

    return (
      <div style={{position: 'sticky'}}>
        <MapContainer  className="map"
          center={[35.6892, 51.3890]} 
          zoom={20}
          maxZoom={18}
          fullscreenControl={true}
          editable={true}
          whenCreated={setMap}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://www.esri.com/">Esri</a> i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            url="http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </MapContainer>
      </div>
    );
  }
export default DTMap;