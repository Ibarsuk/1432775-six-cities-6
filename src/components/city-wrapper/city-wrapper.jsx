import React, {useEffect} from "react";
import {Redirect, useParams} from "react-router";

import {useDispatch, useSelector} from "react-redux";

import {getOffersFilteredByCity} from "../../store/reducers/data/selectors";
import {getActiveCity} from "../../store/reducers/work-process/selectors";

import {changeCity} from "../../store/action-creators";

import OffersList from '../offers-list/offers-list';
import Map from '../map/map';
import {cities, Routes} from "../../const";
import CityWrapperEmpty from "./city-wrapper-empty";


const CityWrapper = () => {
  const activeCity = useSelector(getActiveCity);
  const filteredOffers = useSelector(getOffersFilteredByCity);
  const dispatch = useDispatch();

  const {city} = useParams();

  const isEmpty = filteredOffers.length < 1;
  const isCityValid = Object.values(cities).includes(city);

  const containerEmptyClassName = isEmpty ? ` cities__places-container--empty` : ``;

  useEffect(() => {
    if (activeCity !== city && isCityValid) {
      dispatch(changeCity(city));
    }
  });

  if (!isCityValid) {
    return <Redirect to={Routes.NOT_FOUND}/>;
  }

  return (
    <div className="cities">
      <div className={`cities__places-container container${containerEmptyClassName}`}>
        {isEmpty ?
          <CityWrapperEmpty/>
          :
          <>
            <OffersList offers={filteredOffers} cityName={city} key={`${city}-OffersList`}/>
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

export default CityWrapper;
