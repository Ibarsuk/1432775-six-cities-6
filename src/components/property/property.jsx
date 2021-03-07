import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

import {connect} from "react-redux";

import {accomodationType, RAITING_COEFFICIENT, OfferCardType} from '../../const';
import ActionCreator from '../../store/action-creator';
import {fetchOffer, fetchNearOffers, fetchReviews} from '../../store/api-actions';
import withMapRelatedList from '../../hocks/with-map-related-list';

import Review from '../review/review';
import OfferCardProxy from '../offer-card/offer-card-proxy';
import ReviewForm from '../review-form/review-form';
import Map from '../map/map';
import Loading from '../loading/loading';

const Property = (props) => {
  const {
    offerId,
    isAuthorized,
    onOfferCardMouseOver
  } = props;

  const [state, setState] = useState({
    offer: null,
    nearOffers: null,
    reviews: null
  });

  useEffect(() => {
    if (!state.offer) {
      fetchOffer(offerId)
      .then((offer) => setState((prevState) => ({
        ...prevState,
        offer
      })));
    }
    if (!state.nearOffers) {
      fetchNearOffers(offerId)
      .then((newNearOffers) => setState((prevState) => ({
        ...prevState,
        nearOffers: newNearOffers
      })));
    }
    if (!state.reviews) {
      fetchReviews(offerId)
      .then((newReviews) => setState((prevState) => ({
        ...prevState,
        reviews: newReviews
      })));
    }
  }, []);

  if (!state.offer) {
    return (
      <Loading/>
    );
  }

  const {
    offer: {
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
    },
    nearOffers,
    reviews
  } = state;

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
              {isAuthorized && <ReviewForm/>}
            </section>
          </div>
        </div>
        {nearOffers &&
        <section className="property__map map">
          <Map offers={nearOffers} openedOfferCity={city.name.toLowerCase()}/>
        </section>
        }
      </section>
      {nearOffers &&
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {nearOffers && nearOffers.map((offer, i) => <OfferCardProxy onMouseOver={onOfferCardMouseOver} key={`near${i}`} {...offer} cardType={OfferCardType.NEAR}/>)}
          </div>
        </section>
      </div>
      }
    </main>
  );
};

Property.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  offerId: PropTypes.string.isRequired,
  onOfferCardMouseOver: PropTypes.func.isRequired
};

Property.defaultProps = {
  description: `no description provided`,
  goods: []
};

const mapStateToProps = (state) => ({
  activeOfferId: state.activeOfferId,
  isAuthorized: state.isAuthorized
});

const mapDispatchToProps = (dispatch) => ({
  onActiveOfferChange(activeOfferId) {
    dispatch(ActionCreator.updateActiveOffer(activeOfferId));
  }
});

export {Property};
export default connect(mapStateToProps, mapDispatchToProps)(withMapRelatedList(Property));
