import React from "react";
import PropTypes from "prop-types";
import {cities} from '../../const';

import withOffersFetch from '../../hocks/with-offers-fetch';

import CitiesMenu from '../cities-menu/cities-menu';
import CityWrapper from '../city-wrapper/city-wrapper';

const MainPage = (props) => (
  <main className="page__main page__main--index">
    <h1 className="visually-hidden">Cities</h1>
    <CitiesMenu/>
    <CityWrapper city={props.city}/>
  </main>
);

MainPage.propTypes = {
  city: PropTypes.oneOf(Object.values(cities)).isRequired
};

export {MainPage};
export default withOffersFetch(MainPage);
