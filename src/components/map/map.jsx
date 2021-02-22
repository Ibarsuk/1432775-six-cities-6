import React, {useEffect, useRef} from "react";
import PropTypes from "prop-types";

import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

import {place as propPlace} from '../prop-types';

const ZOOM = 12;
const city = [52.38333, 4.9];
const icon = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [30, 30]
});

const Map = (props) => {
  const mapRef = useRef();

  useEffect(() => {
    mapRef.current = leaflet.map(`map`, {
      center: city,
      ZOOM,
      zoomControl: false,
      marker: true
    });

    mapRef.current.setView(city, ZOOM);

    leaflet
    .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
    .addTo(mapRef.current);

    props.places.forEach((place) => {
      leaflet
    .marker([place.location.latitude, place.location.longitude], {icon})
    .addTo(mapRef.current);
    });

    return () => {
      mapRef.current.remove();
    };
  });

  return (
    <div id="map" ref={mapRef} style={{height: `100%`}}></div>
  );
};

Map.propTypes = {
  places: PropTypes.arrayOf(PropTypes.shape(propPlace)).isRequired
};

export default Map;
