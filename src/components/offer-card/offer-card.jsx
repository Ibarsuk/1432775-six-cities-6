import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import {accomodationType, RAITING_COEFFICIENT} from "../../const";
import {offerPropTypes} from '../prop-types';

const OfferCard = (props) => {
  const {
    id,
    preview,
    price,
    raiting,
    title,
    placeType,
    isPremium,
    isFavourite,
    onMouseOver,
    cardClassname,
    imgWrapperClassname,
    mainImgSize
  } = props;

  const activeButtonClassName = isFavourite ? ` place-card__bookmark-button--active` : ``;

  return (
    <article className={`${cardClassname} place-card`} onMouseOver={() => onMouseOver ? onMouseOver(id) : undefined}>
      {isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
      }
      <div className={`${imgWrapperClassname}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" src={preview} width={mainImgSize.width} height={mainImgSize.height} alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price} </b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button${activeButtonClassName}`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${raiting * RAITING_COEFFICIENT}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{accomodationType[placeType]}</p>
      </div>
    </article>
  );
};

OfferCard.propTypes = {
  ...offerPropTypes,
  onMouseOver: PropTypes.func,
  cardClassname: PropTypes.string.isRequired,
  imgWrapperClassname: PropTypes.string.isRequired,
  mainImgSize: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  })
};

export default OfferCard;
