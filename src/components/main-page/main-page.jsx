import React, {useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";

import {getLoadedOffersStatus} from "../../store/reducers/data/selectors";

import {fetchOffers as offersfetch} from '../../store/api-actions';

import CitiesMenu from '../cities-menu/cities-menu';
import CityWrapper from '../city-wrapper/city-wrapper';
import Loading from '../loading/loading';
import Header from '../header/header';

const MainPage = () => {
  const offersLoaded = useSelector(getLoadedOffersStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!offersLoaded) {
      dispatch(offersfetch());
    }
  }, [offersLoaded]);

  if (!offersLoaded) {
    return <Loading/>;
  }

  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesMenu/>
        <CityWrapper/>
      </main>
    </div>
  );
};

export default MainPage;
