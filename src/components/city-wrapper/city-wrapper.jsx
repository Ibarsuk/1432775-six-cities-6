import React, {useEffect} from "react";
import PropTypes from "prop-types";

import {connect} from "react-redux";

import {cities} from '../../const';
import {offerPropTypes} from '../prop-types';
import ActionCreator from "../../store/action-creator";

import OffersList from '../offers-list/offers-list';
import Map from '../map/map';

const CityWrapper = ({city, offers, initCity, activeCity}) => {
  const filteredOffers = offers.slice().filter((offer) => cities[offer.city.name] === city);
  const isEmpty = filteredOffers.length < 1;

  const containerEmptyClassName = isEmpty ? ` cities__places-container--empty` : ``;

  useEffect(() => {
    if (activeCity !== city) {
      initCity(city);
    }
  });

  return (
    <div className="cities">
      <div className={`cities__places-container container${containerEmptyClassName}`}>
        {isEmpty ?
          <>
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </>
          :
          <>
            <OffersList offers={filteredOffers} cityName={city}/>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map offers={filteredOffers}/>
              </section>
            </div>
          </>
        }
      </div>
    </div>
  );
};

CityWrapper.propTypes = {
  city: PropTypes.oneOf(Object.values(cities)).isRequired,
  activeCity: PropTypes.oneOf(Object.values(cities)).isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape(offerPropTypes)).isRequired,
  initCity: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  offers: state.offers,
  activeCity: state.activeCity
});

const mapDispatchToProps = (dispatch) => ({
  initCity(city) {
    dispatch(ActionCreator.changeCity(city));
  }
});

export {CityWrapper};
export default connect(mapStateToProps, mapDispatchToProps)(CityWrapper);
