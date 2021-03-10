import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";

import {getAuthStatus} from '../../store/reducers/user/selectors';

import {accomodationType, RAITING_COEFFICIENT, Routes} from "../../const";
import {offerPropTypes} from '../prop-types';
import {setOfferFavouriteStatus} from '../../store/api-actions';
import browserHistory from '../../browser-history';

const OfferCard = ({
  id,
  previewImage,
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
}) => {
  const isAuthorized = useSelector(getAuthStatus);

  const dispatch = useDispatch();

  const onSetFavouriteStatusFail = () => {
    isDisabled = false;
  };

  let isDisabled = false;
  const handleFavouriteButtonClick = () => {
    if (!isAuthorized) {
      browserHistory.push(Routes.LOGIN);
      return;
    }
    if (isDisabled) {
      return;
    }
    isDisabled = true;
    dispatch(setOfferFavouriteStatus({
      offerId: id,
      status: Number(!isFavourite),
      onFailCallBack: onSetFavouriteStatusFail
    }));
  };

  const activeButtonClassName = isFavourite ? ` place-card__bookmark-button--active` : ``;

  return (
    <article className={`${cardClassname} place-card`} onMouseOver={() => onMouseOver ? onMouseOver(id) : undefined}>
      {isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
      }
      <div className={`${imgWrapperClassname}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${Routes.OFFER}/${id}`}>
          <img className="place-card__image" src={previewImage} width={mainImgSize.width} height={mainImgSize.height} alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price} </b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button${activeButtonClassName}`} type="button" onClick={handleFavouriteButtonClick}>
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
          <Link to={`${Routes.OFFER}/${id}`}>{title}</Link>
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
