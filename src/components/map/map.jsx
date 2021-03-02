import React, {useCallback, useEffect, useRef} from "react";
import PropTypes from "prop-types";

import {connect} from "react-redux";

import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

import {offerPropTypes} from '../prop-types';
import {cities} from '../../const';

const cityCoords = {
  [cities.Amsterdam]: [52.38333, 4.9],
  [cities.Paris]: [48.85761, 2.358499],
  [cities.Cologne]: [50.930361, 6.937974],
  [cities.Brussels]: [50.842557, 4.3536969999999995],
  [cities.Hamburg]: [53.558341000000006, 10.001654],
  [cities.Dusseldorf]: [51.228402, 6.784314],
};

const ZOOM = 12;
const IconType = {
  COMMON: leaflet.icon({
    iconUrl: `img/pin.svg`,
    iconSize: [30, 30]
  }),
  ACTIVE: leaflet.icon({
    iconUrl: `img/pin-active.svg`,
    iconSize: [30, 30]
  })
};

const Map = ({activeOfferId, offers, activeCity, openedOfferCity}) => {
  const mapRef = useRef();

  const state = useRef({
    markers: {},
    activeMarker: null
  });

  const setNewMarkerIcon = useCallback((marker, newIcon) => {
    mapRef.current.removeLayer(marker);
    marker.options.icon = newIcon;
    addToMap(marker);
  });

  const addToMap = useCallback((item) => {
    item.addTo(mapRef.current);
  });

  useEffect(() => {
    const currentCityCoords = cityCoords[openedOfferCity] || cityCoords[activeCity];
    mapRef.current = leaflet.map(`map`, {
      center: currentCityCoords,
      ZOOM,
      zoomControl: false,
      marker: true
    });

    mapRef.current.setView(currentCityCoords, ZOOM);

    addToMap(leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      }));

    offers.forEach((offer) => {
      state.current.markers[offer.id] = leaflet.marker([offer.location.latitude, offer.location.longitude], {icon: IconType.COMMON});
      addToMap(state.current.markers[offer.id]);
    });

    return () => {
      mapRef.current.remove();
    };
  }, [activeCity, offers]);

  useEffect(() => {
    if (activeOfferId === null) {
      return;
    }
    if (state.current.activeMarker) {
      setNewMarkerIcon(state.current.activeMarker, IconType.COMMON);
    }
    state.current.activeMarker = state.current.markers[activeOfferId];
    setNewMarkerIcon(state.current.activeMarker, IconType.ACTIVE);
  }, [activeOfferId]);

  return (
    <div id="map" ref={mapRef} style={{height: `100%`}}/>
  );
};

Map.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(offerPropTypes)).isRequired,
  activeOfferId: PropTypes.number,
  activeCity: PropTypes.string.isRequired,
  openedOfferCity: PropTypes.string
};

const mapStateToProps = (state) => ({
  activeOfferId: state.activeOfferId,
  activeCity: state.activeCity
});

export {Map};
export default connect(mapStateToProps)(Map);
