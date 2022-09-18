import React, {useState, useEffect} from 'react';
import '@turf/turf';
import L from 'leaflet';
import {intersect} from "@turf/turf";
import {MapContainer, TileLayer} from 'react-leaflet';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import  '../../Leaflet.Editable';
import {area, polygon} from "@turf/turf";
import useUnload from "../../util/useUnload";
import FiguresTypes from "./util/FiguresTypes";
import CustomFigure from "./util/CustomFigure";

let figures = [], polygonsIntersect = [], uniques = [];
const DTMap = (props) => {
    const [map, setMap] = useState(null);

    useUnload((e) => {
        e.preventDefault();
        addPolygonsToDb();
    });

    useEffect(() => {
        if (map != null){
            disableAllPolygonsEdit();
            addFigure(props.pinType);
        }

    }, [props.pinType]);

    useEffect(() => {
        let figuresInfos = props.figuresProto;
        if (figuresInfos != null) {
            if (figuresInfos.length > 0){

                let polygonPoints = [];
                let point = [];
                figuresInfos.map((element) => {

                    if (element.type === FiguresTypes.POLYGON){
                        let pointsArray = element.points.split(",");
                        pointsArray.map(value => {
                            point.push(value);
                            if (point.length === 2){
                                polygonPoints.push(point);
                                point = [];
                            }
                        })
                        addPolygonByProto(polygonPoints, element);
                        polygonPoints = [];
                    }

                    else if (element.type === FiguresTypes.MARKER){
                        let point = element.points.split(",");
                        addMarker(point);
                    }
                });

            }
        }
    }, [props.figuresProto]);

    useEffect(() => {
        if (map != null && figures.length > 0) {
            figures.map((element) => {
                if (props.isRemoveButtonActive)
                    element.figure.on('click', function () {
                        removeFigure(element);
                    })
                else{
                    element.figure.removeEventListener('click');
                }
            })
        }
    },  [props.isRemoveButtonActive])


    const addFigure = (pinType) => {
        if (!isUniquesIncludesPinType(pinType)){
            if (pinType.type === FiguresTypes.MARKER){
                map.on('click', function (e) {
                    let newMarker = addMarker(e.latlng, pinType.category);
                    addMarkerToDb(newMarker, pinType.category);
                })
            } else {
                map.removeEventListener('click');
            }
            if (pinType.type === FiguresTypes.POLYGON)
                addPolygon(pinType.category);
        }

    }

    const addPolygon = (category) => {
        let polygon = map.editTools.startPolygon(null, {color: props.pinType.color});
        configurePolygon(polygon, category);
    }

    const addPolygonByProto = (polygonPoints, polygonProto) => {
        let pinType;
        pinType = {
            category: polygonProto.categoryId,
            type: polygonProto.type,
            color: polygonProto.color,
            isUnique: polygonProto.isUnique
        };
        if (polygonProto.isUnique && !isUniquesIncludesPinType(pinType)){
            let polygon = L.polygon(polygonPoints, {color: pinType.color});
            polygon.addTo(map);
            configurePolygon(polygon);
        }
    }

    const configurePolygon = (polygon, category) => {
        polygon.on('dblclick', function () {
            polygon.toggleEdit();
        });
        polygon.on('editable:disable', function () {
            if (figures.length > 1)
                addIntersectionPolygon();
            alert(getCulturePolygonArea());
        });
        polygon.on('editable:enable', function () {
            if (polygonsIntersect.length > 0){
                removeAllIntersectionPolygons();
            }
        })
        let customFigure = new CustomFigure();
        customFigure.figure = polygon;
        customFigure._category_id = category;
        figures.push(customFigure);
    }

    const addPolygonsToDb = () => {
        //TODO change example
        disableAllPolygonsEdit();
        /*let polygonsInfos = [];
        figures.map(element => {
            const polygonInfo = {
                id: 0, // autogen
                mapId: 111,
                categoryId: FigureProperties[element.getPopup().getContent()].categoryId,
                points: getFigurePoints(element.figure).toString(),

            };
            polygonsInfos.push(polygonInfo);
        })
        props.sendPolygonInfo(polygonsInfos);*/
    }

    const addMarker = (points, category) => {
        let maker = L.marker(points).addTo(map);
        /*let maker = new L.marker(points).addTo(map);*/
        let figure = new CustomFigure();
        figure.figure = maker;
        figure._category_id = category;
        figures.push(figure);
        return maker;
    }

    const addMarkerToDb = (marker, category) => {
        //TODO change example
        const markerInfo = {
            modelId: "111",
            points: marker._latlng.lat + ", " + marker._latlng.lng,
            category: category
        };
        props.sendMarkerInfo(markerInfo);
    }

    const getFigurePoints = (figure) => {
        let figurePoints = [];
        figure.getLatLngs()[0].map((el) => figurePoints.push([el.lat, el.lng]));
        return figurePoints;
    }

    const removeAllIntersectionPolygons = () => {
        polygonsIntersect.splice(0, polygonsIntersect.length);
    }

    const addIntersectionPolygon = () => {
        let tPolygons = [];
        figures.map((el) => tPolygons.push(convertLPolygonToTPolygon(el.figure)));
        if (tPolygons.length > 0) {
            let intersectionTurf = intersect(...tPolygons);
            if (intersectionTurf !== null) {
                let intersectionTurfPoints = intersectionTurf.geometry.coordinates;
                let intersection = L.polygon(intersectionTurfPoints);
                polygonsIntersect.push(intersection);
            }
        }
    }

    const convertLPolygonToTPolygon = (figure) => {
        let figurePoints = getFigurePoints(figure);
        figurePoints.push(figurePoints[0]);
        return polygon([figurePoints]);
    }

    const getCulturePolygonArea = () => {
        /*let intersectionPolygonsArea = 0;
        let culturePolygon;
        let culturePolygonArea;

        if (polygonsIntersect.length !== 0)
            polygonsIntersect.map((el) => {
                intersectionPolygonsArea += area(convertLPolygonToTPolygon(el));
                return null;
            })
        else
            intersectionPolygonsArea = 0;

        if (figures.length > 0)
            culturePolygon = figures.find((element) => {
                return element.options.color === 'yellow';
            })

        if (typeof culturePolygon !== 'undefined')
            culturePolygonArea = getPolygonArea(culturePolygon)
        else*/
            return 0;

       /* return culturePolygonArea - intersectionPolygonsArea;*/
    }

    const getPolygonArea = (figure) => {
        return area(convertLPolygonToTPolygon(figure));
    }

    const removeFigure = (customFigure) => {

        if (isUniquesIncludesCategory(customFigure._category_id))
            uniques.splice(uniques.indexOf(uniques.find(element => element.category === customFigure._category_id)), 1)
        figures.splice(figures.indexOf(customFigure), 1);
        //TODO remove figure from db

        alert(customFigure._db_id);
        map.removeLayer(customFigure.figure);

    }

    const removeMarkerFromDb = (figure) => {
        //TODO change example
        /*let marker = markers.find(element => element._leaflet_id === figure._leaflet_id);
        const markerInfo = {
            modelId: "111",
            points: marker._latlng.lat + ", " + figure._latlng.lng,
            category: ""
        };
        props.removeMarkerInfo(markerInfo);*/

    }

    const disableAllPolygonsEdit = () => {
        if (figures.length > 0)
            figures.map((element) => element.figure.disableEdit());
    }

    const isUniquesIncludesCategory = (category) => {
        return uniques.some(element => element.category === category);
    }
    const isUniquesIncludesPinType = (pinType) => {
        if (pinType.isUnique){
            if (uniques.some(element => isPinTypesEquals(element, pinType)))
                return true;
            uniques.push(pinType);
        }
        return false;
    }

    const isPinTypesEquals = (first, second) => {
        if ( first.category === second.category
             && first.type === second.type
             && first.color === second.color
             && first.isUnique === second.isUnique)
            return true;
        else
            return false;
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