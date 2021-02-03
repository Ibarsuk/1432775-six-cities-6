import React from "react";
import PropTypes from "prop-types";
import placesArr from '../mock/mock-places';
import PlaceCard from './place-card';
import {PlaceCardState} from '../const';

const FavouritesPage = (props) => {
  const {isEmpty, places = placesArr} = props;
  const cities = places
  .filter((place) => place.isFavourite)
  .reduce((acc, current) => {
    let townCategory = acc[current.city.name];
    if (townCategory) {
      townCategory.push(current);
    } else {
      acc[current.city.name] = [current];
    }
    return acc;
  }, {});

  const CityFavComponent = (properties) => (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{properties.name}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {cities[properties.name].map((place) => <PlaceCard placeInfo={place} state={PlaceCardState.FAVOURITE} key={`fav-cars${place.id}`}/>)}
      </div>
    </li>
  );

  if (isEmpty) {
    return (
      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Favorites (empty)</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Nothing yet saved.</b>
              <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
            </div>
          </section>
        </div>
      </main>
    );
  }
  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {Object.keys(cities).map((city, i) => <CityFavComponent key={city + i} name={city}/>)}
          </ul>
        </section>
      </div>
    </main>
  );
};

FavouritesPage.propTypes = {
  isEmpty: PropTypes.bool,
  places: PropTypes.array
};

export default FavouritesPage;
