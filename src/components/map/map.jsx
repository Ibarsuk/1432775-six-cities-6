import React, {useEffect, useRef} from "react";
import PropTypes from "prop-types";

import {connect} from "react-redux";

import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

import {propOffer} from '../prop-types';
import ActionCreator from "../../store/action-creator";

const ZOOM = 12;
const city = [52.38333, 4.9];
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

let markers = {};
let activeMarker = null;
let isUpdateNeeded = true;

const updateMarker = (ref, newIcon) => {
  ref.current.removeLayer(activeMarker);
  activeMarker.options.icon = newIcon;
  activeMarker.addTo(ref.current);
};

const Map = (props) => {
  const {onMapUnmount, activeOffer, offers} = props;
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

    offers.forEach((offer) => {
      const marker = leaflet.marker([offer.location.latitude, offer.location.longitude], {icon: IconType.COMMON});
      markers[offer.id] = marker;
      marker.addTo(mapRef.current);
    });

    return () => {
      mapRef.current.remove();
      onMapUnmount().then(() => {
        isUpdateNeeded = true;
      });
      markers = {};
      activeMarker = null;
    };
  }, []);

  useEffect(() => {
    if (activeOffer === null || isUpdateNeeded === false) {
      return;
    }
    if (activeMarker) {
      updateMarker(mapRef, IconType.COMMON);
    }
    activeMarker = markers[activeOffer];
    updateMarker(mapRef, IconType.ACTIVE);
  }, [activeOffer]);

  return (
    <div id="map" ref={mapRef} style={{height: `100%`}}></div>
  );
};

Map.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(propOffer)).isRequired,
  activeOffer: PropTypes.number,
  onMapUnmount: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  activeOffer: state.activeOffer
});

const mapDispatchToProps = (dispatch) => ({
  async onMapUnmount() {
    isUpdateNeeded = false;
    dispatch(ActionCreator.updateActiveOffer(null));
  }
});

export {Map};
export default connect(mapStateToProps, mapDispatchToProps)(Map);
