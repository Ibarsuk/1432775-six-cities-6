import React from "react";
import PropTypes from "prop-types";
import {AccomodationType} from '../const';
import mockReviews from '../mock/mock-comments';
import places from '../mock/mock-places';
import Review from './review';
import {RAITINGS} from '../const';
import PlaceCard from './place-card';
import {generateRandomSet} from '../mock/additional';

const Property = (props) => {
  const {
    placeInfo: {
      price = 0,
      raiting = 0,
      title = `place title`,
      placeType = `room type`,
      isPremium = false,
      isFavourite = false,
      images = [],
      bedrooms,
      maxAdults,
      goods = [],
      host: {
        avatarUrl = `img/no-avatar`,
        isPro = false,
        name: username = `User name`
      },
      description = `no description provided`
    },
    isSigned = false
  } = props;

  const nearPlaces = places.slice(0, 3);
  const reviews = generateRandomSet(mockReviews);

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
                <span style={{width: `${raiting * 20}%`}}></span>
                <span className="visually-hidden">{raiting}</span>
              </div>
              <span className="property__rating-value rating__value">{raiting}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {AccomodationType[placeType]}
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
                {reviews.map((review, i) => <Review key={`review${i}`} reviewInfo={review}/>)}
              </ul>}
              {
                isSigned &&
              <form className="reviews__form form" action="#" method="post">
                <label className="reviews__label form__label" htmlFor="review">Your review</label>
                <div className="reviews__rating-form form__rating">
                  {RAITINGS.map((raitingName, i) => (
                    <React.Fragment key={raitingName + i}>
                      <input className="form__rating-input visually-hidden" name="rating" value={RAITINGS.length - i} id={`${RAITINGS.length - i}-star`} type="radio"/>
                      <label htmlFor={`${RAITINGS.length - i}-star`} className="reviews__rating-label form__rating-label" title={raitingName}>
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                      </label>
                    </React.Fragment>
                  ))}
                </div>
                <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
                <div className="reviews__button-wrapper">
                  <p className="reviews__help">
                      To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
                  </p>
                  <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
                </div>
              </form>
              }
            </section>
          </div>
        </div>
        <section className="property__map map"></section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {nearPlaces.map((place, i) => <PlaceCard key={`near${i}`} placeInfo={place}/>)}
          </div>
        </section>
      </div>
    </main>
  );
};

Property.propTypes = {
  placeInfo: PropTypes.shape({
    preview: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    raiting: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    placeType: PropTypes.oneOf(Object.keys(AccomodationType)),
    isPremium: PropTypes.bool.isRequired,
    isFavourite: PropTypes.bool.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
    bedrooms: PropTypes.number.isRequired,
    maxAdults: PropTypes.number.isRequired,
    goods: PropTypes.arrayOf(PropTypes.string),
    host: PropTypes.shape({
      avatarUrl: PropTypes.string,
      isPro: PropTypes.bool,
      name: PropTypes.string
    }),
    description: PropTypes.string
  }),
  isSigned: PropTypes.bool.isRequired
};

export default Property;
