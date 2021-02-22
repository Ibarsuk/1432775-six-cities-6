import React from "react";
import PropTypes from "prop-types";

import {connect} from "react-redux";

import {propOffer} from '../prop-types';
import {OfferCardType} from '../../const';

import OfferCardProxy from '../offer-card/offer-card-proxy';


const sortOffers = (citiesArr) => {
  return citiesArr
  .filter((offer) => offer.isFavourite)
  .reduce((acc, current) => {
    let townCategory = acc[current.city.name];
    if (townCategory) {
      townCategory.push(current);
    } else {
      acc[current.city.name] = [current];
    }
    return acc;
  }, {});
};

const FavouritesPage = (props) => {
  const {isEmpty, offers} = props;

  const cities = sortOffers(offers);

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
            {Object.keys(cities).map((city, i) => (
              <li className="favorites__locations-items" key={city + i}>
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>{city}</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  {cities[city].map((offer) => <OfferCardProxy {...offer} key={`fav-cards${offer.id}`} cardType={OfferCardType.FAVOURITE}/>)}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
};

FavouritesPage.propTypes = {
  isEmpty: PropTypes.bool,
  offers: PropTypes.arrayOf(PropTypes.shape(propOffer)).isRequired
};

const mapStateToProps = (state) => ({
  offers: state.offers
});

export {FavouritesPage};
export default connect(mapStateToProps)(FavouritesPage);
