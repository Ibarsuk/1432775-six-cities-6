import React, {useEffect, useState, useRef} from "react";
import PropTypes from "prop-types";

import {useSelector} from "react-redux";

import {getAuthStatus} from "../../store/reducers/user/selectors";

import {accomodationType, RAITING_COEFFICIENT, OfferCardType, StatusCode, Routes} from '../../const';
import {fetchOffer, fetchNearOffers, fetchReviews} from '../../store/api-actions';
import browserHistory from '../../browser-history';

import {useDispatch} from 'react-redux';
import {setOfferFavouriteStatus} from '../../store/api-actions';

import Review from '../review/review';
import OfferCardProxy from '../offer-card/offer-card-proxy';
import ReviewForm from '../review-form/review-form';
import Map from '../map/map';
import Loading from '../loading/loading';

const Property = ({offerId}) => {
  const [offer, setOffer] = useState(null);
  const [nearOffers, setNearOffers] = useState(null);
  const [reviews, setReviews] = useState(null);

  const isAuthorized = useSelector(getAuthStatus);

  const dispatch = useDispatch();

  const favouriteButtonRef = useRef();

  useEffect(() => {
    if (!offer) {
      fetchOffer(offerId)
      .then((newOffer) => setOffer(newOffer))
      .catch((err) => {
        if (err.response.status === StatusCode.NOT_FOUND) {
          browserHistory.push(Routes.NOT_FOUND);
        }
      });
    }
    if (!nearOffers) {
      fetchNearOffers(offerId)
      .then((newNearOffers) => setNearOffers(newNearOffers));
    }
    if (!reviews) {
      fetchReviews(offerId)
      .then((newReviews) => setReviews(newReviews));
    }
  }, [offerId]);

  if (!offer) {
    return (
      <Loading/>
    );
  }

  const {
    id,
    price,
    raiting,
    title,
    placeType,
    isPremium,
    isFavourite,
    images,
    bedrooms,
    maxAdults,
    goods,
    host: {
      avatarUrl,
      isPro,
      name: username
    },
    description,
    city
  } = offer;

  let isDisabled = false;
  const handleFavouriteButtonClick = () => {
    if (isDisabled) {
      return;
    }
    isDisabled = true;
    favouriteButtonRef.current.disabled = true;
    dispatch(setOfferFavouriteStatus(id, Number(!isFavourite), (updatedOffer) => setOffer(updatedOffer)));
  };


  return (
    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {images.map((image, i) => (
              <div className="property__image-wrapper" key={image + i}>
                <img className="property__image" src={image} alt={`image of ${title}`}/>
              </div>
            ))}
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {
              isPremium &&
            <div className="property__mark">
              <span>Premium</span>
            </div>
            }
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {title}
              </h1>
              <button ref={favouriteButtonRef} onClick={handleFavouriteButtonClick} className={`property__bookmark-button button${isFavourite ? ` property__bookmark-button--active` : ``}`} type="button">
                <svg className="property__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{width: `${raiting * RAITING_COEFFICIENT}%`}}></span>
                <span className="visually-hidden">{raiting}</span>
              </div>
              <span className="property__rating-value rating__value">{raiting}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {accomodationType[placeType]}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {`${bedrooms} Bedroom${bedrooms > 1 ? `s` : ``}`}
              </li>
              <li className="property__feature property__feature--adults">
                {`${maxAdults} adult${maxAdults > 1 ? `s` : ``}`}
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            {goods.length > 0 &&
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {goods.map((good, i) => (
                  <li className="property__inside-item" key={good + i}>
                    {good}
                  </li>
                ))}
              </ul>
            </div>}
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className={`property__avatar-wrapper user__avatar-wrapper${isPro ? ` property__avatar-wrapper--pro` : ``}`}>
                  <img className="property__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar"/>
                </div>
                <span className="property__user-name">
                  {username}
                </span>
              </div>
              <div className="property__description">
                <p className="property__text">
                  {description}
                </p>
              </div>
            </div>
            <section className="property__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews ? reviews.length : `0`}</span></h2>
              {reviews &&
              <ul className="reviews__list">
                {reviews.map((review, i) => <Review key={`review${i}`} {...review} />)}
              </ul>}
              {isAuthorized && <ReviewForm onReviewsChange={setReviews} offerId={offer.id}/>}
            </section>
          </div>
        </div>
        {nearOffers &&
        <section className="property__map map">
          <Map offers={nearOffers} openedOfferCity={city.name.toLowerCase()} openedOffer={offer}/>
        </section>
        }
      </section>
      {nearOffers &&
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {nearOffers && nearOffers.map((nearOffer, i) => <OfferCardProxy key={`near${i}`} {...nearOffer} cardType={OfferCardType.NEAR}/>)}
          </div>
        </section>
      </div>
      }
    </main>
  );
};

Property.propTypes = {
  offerId: PropTypes.string.isRequired
};

Property.defaultProps = {
  description: `no description provided`,
  goods: []
};

export default Property;
