import React, {useEffect, useMemo, useRef} from "react";
import {useHistory, useParams} from "react-router";

import {useOffer} from '../../hooks/use-offer';
import {useNearOffers} from '../../hooks/use-near-offers';
import {useReviews} from '../../hooks/use-reviews';

import {useSelector, useDispatch} from "react-redux";

import {getAuthStatus} from "../../store/reducers/user/selectors";

import {accommodationType, OfferCardType, Routes, StatusCode} from '../../const';
import {setOfferFavouriteStatus} from '../../store/api-actions';
import {getStarsWidth} from '../../util';

import Review from '../review/review';
import OfferCardProxy from '../offer-card/offer-card-proxy';
import ReviewForm from '../review-form/review-form';
import Map from '../map/map';
import Loading from '../loading/loading';
import Header from '../header/header';

const MAX_COMMENTS_NUMBER = 10;

const Property = () => {
  const {id} = useParams();
  const history = useHistory();

  const {offer, setOffer, fetchOffer} = useOffer();
  const {nearOffers, fetchNearOffers} = useNearOffers();
  const {reviewsSortedByDate, setReviews, fetchReviews} = useReviews();

  const slicedSortedReviews = useMemo(
      () => reviewsSortedByDate.slice(0, MAX_COMMENTS_NUMBER),
      [reviewsSortedByDate]
  );

  const isAuthorized = useSelector(getAuthStatus);

  const dispatch = useDispatch();

  const favouriteButtonRef = useRef();

  // const fetchData = async () => {
  //   fetchOffer(id);
  //   fetchNearOffers(id);
  //   fetchReviews(id);
  // };

  useEffect(() => {
    // fetchData();
    fetchOffer(id);
    fetchNearOffers(id);
    fetchReviews(id);
  }, [id]);

  if (!offer) {
    return (
      <Loading/>
    );
  }

  const handleOfferCardClick = () => scrollTo(0, 0);

  let isDisabled = false;
  const handleFavouriteButtonClick = () => {
    if (isDisabled) {
      return;
    }
    isDisabled = true;
    favouriteButtonRef.current.disabled = true;
    dispatch(
        setOfferFavouriteStatus({
          offerId: offer.id,
          status: offer.isFavourite ? 0 : 1,
          onSuccessCallback: (updatedOffer) => setOffer(updatedOffer),
          onFailCallback: (err) => {
            if (err.response.status === StatusCode.UNAUTHORIZED) {
              history.push(Routes.LOGIN);
            }
          }
        })
    );
  };

  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {offer.images.map((image, i) => (
                <div className="property__image-wrapper" key={image + i}>
                  <img className="property__image" src={image} alt={`image of ${offer.title}`}/>
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {
                offer.isPremium &&
            <div className="property__mark">
              <span>Premium</span>
            </div>
              }
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {offer.title}
                </h1>
                <button ref={favouriteButtonRef} onClick={handleFavouriteButtonClick} className={`property__bookmark-button button${offer.isFavourite ? ` property__bookmark-button--active` : ``}`} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: getStarsWidth(offer.rating)}}></span>
                  <span className="visually-hidden">{offer.rating}</span>
                </div>
                <span className="property__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {accommodationType[offer.placeType]}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {`${offer.bedrooms} Bedroom${offer.bedrooms > 1 ? `s` : ``}`}
                </li>
                <li className="property__feature property__feature--adults">
                  {`${offer.maxAdults} adult${offer.maxAdults > 1 ? `s` : ``}`}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              {offer.goods.length > 0 &&
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {offer.goods.map((good, i) => (
                  <li className="property__inside-item" key={good + i}>
                    {good}
                  </li>
                ))}
              </ul>
            </div>}
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper user__avatar-wrapper${offer.host.isPro ? ` property__avatar-wrapper--pro` : ``}`}>
                    <img className="property__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                    {offer.host.name}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewsSortedByDate ? reviewsSortedByDate.length : `0`}</span></h2>
                {reviewsSortedByDate &&
              <ul className="reviews__list">
                {slicedSortedReviews.map((review, i) => <Review key={`review${i}`} {...review} />)}
              </ul>}
                {isAuthorized && <ReviewForm onReviewsChange={setReviews} offerId={offer.id}/>}
              </section>
            </div>
          </div>
          {nearOffers &&
        <section className="property__map map">
          <Map offers={nearOffers} openedOfferCity={offer.city.name.toLowerCase()} openedOffer={offer}/>
        </section>
          }
        </section>
        {nearOffers &&
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {nearOffers && nearOffers.map((nearOffer, i) => <OfferCardProxy key={`near${i}`} {...nearOffer} cardType={OfferCardType.NEAR} onClick={handleOfferCardClick}/>)}
          </div>
        </section>
      </div>
        }
      </main>
    </div>
  );
};

export default Property;
