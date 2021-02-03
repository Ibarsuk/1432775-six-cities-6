import React from "react";
import PropTypes from "prop-types";
import {AccomodationType, PlaceCardState} from '../const';

const PlaceCard = (props) => {
  const {placeInfo: {preview = `img/placeholder260.png`, price = 0, raiting = 0, title = `place title`, placeType = `room type`, isPremium = false, isFavourite = false}, state = PlaceCardState.COMMON} = props;


  const isForFavourites = (state === PlaceCardState.FAVOURITE);
  const MainImg = {
    WIDTH: isForFavourites ? 150 : 260,
    HEIGHT: isForFavourites ? 110 : 200
  };

  return (
    <article className={`${isForFavourites ? `favorites__card` : `cities__place-card`} place-card`}>
      {isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
      }
      <div className={`${isForFavourites ? `favorites` : `cities`}__image-wrapper place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src={preview} width={MainImg.WIDTH} height={MainImg.HEIGHT} alt="Place image"/>
        </a>
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
          <a href="#">{title}</a>
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
    isFavourite: PropTypes.bool.isRequired
  }),
  state: PropTypes.oneOf(Object.values(PlaceCardState))
};

export default PlaceCard;
