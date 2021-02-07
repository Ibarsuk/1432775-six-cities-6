import React from "react";
import PropTypes from "prop-types";
import {AccomodationType, PlaceCardState} from '../const';
import {Link} from "react-router-dom";

const PlaceCard = (props) => {
  const {placeInfo: {id, preview = `img/placeholder260.png`, price = 0, raiting = 0, title = `place title`, placeType = `room type`, isPremium = false, isFavourite = false}, state = PlaceCardState.COMMON} = props;

  const MainImg = {};
  let cardHtmlClass;
  let imgWrapperHtmlClass;
  switch (state) {
    case PlaceCardState.FAVOURITE:
      cardHtmlClass = `favorites__card`;
      imgWrapperHtmlClass = `favorites`;
      MainImg.WIDTH = 150;
      MainImg.Height = 110;
      break;
    case PlaceCardState.NEAR:
      cardHtmlClass = `near-places__card`;
      imgWrapperHtmlClass = `near-places`;
      MainImg.WIDTH = 260;
      MainImg.Height = 200;
      break;
    default:
      cardHtmlClass = `cities__place-card`;
      imgWrapperHtmlClass = `cities`;
      MainImg.WIDTH = 260;
      MainImg.Height = 200;
  }

  return (
    <article className={`${cardHtmlClass} place-card`}>
      {isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
      }
      <div className={`${imgWrapperHtmlClass}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" src={preview} width={MainImg.WIDTH} height={MainImg.HEIGHT} alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price} </b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button${isFavourite ? ` place-card__bookmark-button--active` : ``}`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${raiting * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{AccomodationType[placeType]}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  placeInfo: PropTypes.shape({
    preview: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    raiting: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    placeType: PropTypes.oneOf(Object.keys(AccomodationType)),
    isPremium: PropTypes.bool.isRequired,
    isFavourite: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired
  }),
  state: PropTypes.oneOf(Object.values(PlaceCardState))
};

export default PlaceCard;
