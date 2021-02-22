import React from "react";
import PropTypes from "prop-types";

import {connect} from "react-redux";

import {accomodationType, RAITING_COEFFICIENT, PlaceCardType} from '../../const';
import {place as propPlace, review as propReview} from '../prop-types';

import Review from '../review/review';
import PlaceCardProxy from '../place-card/place-card-proxy';
import ReviewForm from '../review-form/review-form';
import Map from '../map/map';


const Property = (props) => {
  const {
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
    isSigned,
    places,
    reviews
  } = props;

  const nearPlaces = places.slice(0, 3);

  return (
    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {images.map((image, i) => (
              <React.Fragment key={image + i}>
                <div className="property__image-wrapper">
                  <img className="property__image" src={image} alt={`image of ${title}`}/>
                </div>
              </React.Fragment>
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
              <button className={`property__bookmark-button button${isFavourite ? ` property__bookmark-button--active` : ``}`} type="button">
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
                  <React.Fragment key={good + i}>
                    <li className="property__inside-item">
                      {good}
                    </li>
                  </React.Fragment>
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
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length || 0}</span></h2>
              {reviews.length > 0 &&
              <ul className="reviews__list">
                {reviews.map((review, i) => <Review key={`review${i}`} {...review} />)}
              </ul>}
              {isSigned && <ReviewForm/>}
            </section>
          </div>
        </div>
        <section className="property__map map">
          <Map places={nearPlaces}/>
        </section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {nearPlaces.map((place, i) => <PlaceCardProxy key={`near${i}`} {...place} cardType={PlaceCardType.NEAR}/>)}
          </div>
        </section>
      </div>
    </main>
  );
};

Property.propTypes = {
  ...propPlace,
  isSigned: PropTypes.bool.isRequired,
  places: PropTypes.arrayOf(PropTypes.shape(propPlace)).isRequired,
  reviews: PropTypes.arrayOf(PropTypes.shape(propReview)).isRequired
};

Property.defaultProps = {
  description: `no description provided`,
  isSigned: false,
  goods: []
};

const mapStateToProps = (state) => ({
  places: state.places,
  reviews: state.reviews
});

export default connect(mapStateToProps)(Property);
