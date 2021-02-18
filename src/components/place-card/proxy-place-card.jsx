import React from "react";
import PropTypes from "prop-types";

import {PlaceCardState} from '../../const';
import PlaceCard from './place-card';

const MainImgSize = {
  BIG: {
    WIDTH: 260,
    HEIGHT: 200
  },
  SMALL: {
    WIDTH: 150,
    HEIGHT: 110
  }
};

const ProxyPlaceCard = (props) => {
  const {state, ...restProps} = props;

  let MainImg = {};
  let cardHtmlClass;
  let imgWrapperHtmlClass;
  switch (state) {
    case PlaceCardState.FAVOURITE:
      cardHtmlClass = `favorites__card`;
      imgWrapperHtmlClass = `favorites`;
      MainImg = MainImgSize.SMALL;
      break;
    case PlaceCardState.NEAR:
      cardHtmlClass = `near-places__card`;
      imgWrapperHtmlClass = `near-places`;
      MainImg = MainImgSize.BIG;
      break;
    case PlaceCardState.CITIES:
      cardHtmlClass = `cities__place-card`;
      imgWrapperHtmlClass = `cities`;
      MainImg = MainImgSize.BIG;
  }


  return <PlaceCard cardHtmlClass={cardHtmlClass} imgWrapperHtmlClass={imgWrapperHtmlClass} mainImgSize={MainImg} {...restProps}/>;
};

ProxyPlaceCard.propTypes = {
  state: PropTypes.oneOf(Object.values(PlaceCardState)).isRequired
};

export default ProxyPlaceCard;
