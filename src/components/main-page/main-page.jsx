import React, {useEffect} from "react";
import PropTypes from "prop-types";

import {useDispatch, useSelector} from "react-redux";

import {getLoadedOffersStatus} from "../../store/reducers/data/selectors";

import {fetchOffers as offersfetch} from '../../store/api-actions';
import {cities} from '../../const';

import CitiesMenu from '../cities-menu/cities-menu';
import CityWrapper from '../city-wrapper/city-wrapper';
import Loading from '../loading/loading';


const MainPage = ({city}) => {
  const areOffersLoaded = useSelector(getLoadedOffersStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!areOffersLoaded) {
      dispatch(offersfetch());
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
  city: PropTypes.oneOf(Object.values(cities)).isRequired
};

export default MainPage;
