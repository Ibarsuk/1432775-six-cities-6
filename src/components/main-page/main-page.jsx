import React from "react";
import PropTypes from "prop-types";

import {cities} from '../../const';

import CitiesMenu from '../cities-menu/cities-menu';
import CityWrapper from '../city/city';

const MainPage = (props) => {
  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <CitiesMenu/>
      <CityWrapper city={props.city}/>
    </main>
  );
};

MainPage.propTypes = {
  city: PropTypes.oneOf(Object.values(cities)).isRequired
};

export default MainPage;
