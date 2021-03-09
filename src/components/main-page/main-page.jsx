import React, {useEffect} from "react";
import PropTypes from "prop-types";

import {connect} from "react-redux";

import {fetchOffers as offersfetch} from '../../store/api-actions';
import {cities} from '../../const';

import CitiesMenu from '../cities-menu/cities-menu';
import CityWrapper from '../city-wrapper/city-wrapper';
import Loading from '../loading/loading';


const MainPage = ({city, areOffersLoaded, fetchOffers}) => {

  useEffect(() => {
    if (!areOffersLoaded) {
      fetchOffers();
    }
  }, [areOffersLoaded]);

  if (!areOffersLoaded) {
    return <Loading/>;
  }

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <CitiesMenu/>
      <CityWrapper city={city}/>
    </main>
  );
};

MainPage.propTypes = {
  city: PropTypes.oneOf(Object.values(cities)).isRequired,
  areOffersLoaded: PropTypes.bool.isRequired,
  fetchOffers: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  areOffersLoaded: state.areOffersLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  fetchOffers() {
    dispatch(offersfetch());
  }
});

export {MainPage};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
