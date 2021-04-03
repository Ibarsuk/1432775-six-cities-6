import React, {memo, useEffect, useRef} from "react";
import PropTypes from "prop-types";

import {useSelector} from "react-redux";

import {getActiveCity, getActiveOfferId} from "../../store/reducers/work-process/selectors";


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
const MAX_NEAR_OFFERS = 3;

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

const Map = ({
  offers,
  openedOffer
}) => {
  const activeOfferId = useSelector(getActiveOfferId);
  const activeCity = useSelector(getActiveCity);

  const offersToCreateMarkers = openedOffer ? offers.slice(0, MAX_NEAR_OFFERS) : offers;

  const mapRef = useRef();

  const state = useRef({
    markers: {},
    activeMarker: null
  });

  const setNewMarkerIcon = (marker, newIcon) => {
    mapRef.current.removeLayer(marker);
    marker.options.icon = newIcon;
    addToMap(marker);
  };

  const createMarker = (offer, iconType) => {
    state.current.markers[offer.id] = leaflet.marker([offer.location.latitude, offer.location.longitude], {icon: iconType});
    addToMap(state.current.markers[offer.id]);
  };

  const addToMap = (item) => {
    item.addTo(mapRef.current);
  };

  useEffect(() => {
    const currentCityCoords = openedOffer ? cityCoords[openedOffer.city.name.toLowerCase()] : cityCoords[activeCity];
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

    offersToCreateMarkers.forEach((offer) => {
      createMarker(offer, IconType.COMMON);
    });

    if (openedOffer) {
      createMarker(openedOffer, IconType.ACTIVE);
    }

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
    <div id="map" style={{height: `100%`}}/>
  );
};

Map.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(offerPropTypes)).isRequired,
  openedOffer: PropTypes.shape(offerPropTypes)
};

export default memo(Map, (prev, next) => {
  if (!prev.offers.length) {
    return 0;
  }
  return next.offers.every((offer, i) => {
    return offer.id === prev.offers[i].id;
  });
});
