import {useDispatch, useSelector} from "react-redux";

import React, {useEffect, useMemo} from "react";

import {OfferCardType} from '../../const';
import {getFavouriteOffers, getLoadedFavouriteOffersStatus} from "../../store/reducers/data/selectors";
import {fetchFavouriteOffers} from "../../store/api-actions";

import OfferCardProxy from '../offer-card/offer-card-proxy';
import Loading from '../loading/loading';
import Header from '../header/header';
import Footer from '../footer/footer';
import FavouritesPageEmpty from "./favourites-page-empty";

const FavouritesPage = () => {
  const favouriteOffers = useSelector(getFavouriteOffers);
  const offersLoaded = useSelector(getLoadedFavouriteOffersStatus);

  const dispatch = useDispatch();

  const offersByCities = useMemo(() =>
    favouriteOffers
  .filter((offer) => offer.isFavourite)
  .reduce((acc, current) => {
    if (!acc[current.city.name]) {
      acc[current.city.name] = [];
    }
    acc[current.city.name].push(current);
    return acc;
  }, {}), [favouriteOffers]);

  useEffect(() => {
    dispatch(fetchFavouriteOffers());
  }, [offersLoaded]);

  if (!offersLoaded) {
    return <Loading/>;
  }

  const offerCities = Object.keys(offersByCities);
  const isEmpty = !offerCities.length;
  return (
    <div className="page">
      <Header/>
      <main className={`page__main page__main--favorites${isEmpty ? ` page__main--favorites-empty` : ``}`}>
        {isEmpty
          ?
          <FavouritesPageEmpty/>
          :
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {offerCities.map((city, i) => (
                  <li className="favorites__locations-items" key={city + i}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{city}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {offersByCities[city].map((offer) => <OfferCardProxy {...offer} key={`fav-cards${offer.id}`} cardType={OfferCardType.FAVOURITE}/>)}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        }
      </main>
      <Footer/>
    </div>
  );
};

export default FavouritesPage;
