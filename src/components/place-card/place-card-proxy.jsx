import React from "react";
import PropTypes from "prop-types";

import {PlaceCardType} from '../../const';
import PlaceCard from './place-card';

const cardOptions = {
  [PlaceCardType.FAVOURITE]: {
    cardClassname: `favorites__card`,
    imgWrapperClassname: `favorites`,
    imgSizes: {
      width: 150,
      height: 110
    }
  },
  [PlaceCardType.NEAR]: {
    cardClassname: `near-places__card`,
    imgWrapperClassname: `near-places`,
    imgSizes: {
      width: 260,
      height: 200
    }
  },
  [PlaceCardType.CITIES]: {
    cardClassname: `cities__place-card`,
    imgWrapperClassname: `cities`,
    imgSizes: {
      width: 260,
      height: 200
    }
  }
};

const PlaceCardProxy = (props) => {
  const options = cardOptions[props.cardType];

  return <PlaceCard
    cardClassname={options.cardClassname}
    imgWrapperClassname={options.imgWrapperClassname}
    mainImgSize={options.imgSizes}
    {...props}
  />;
};

PlaceCardProxy.propTypes = {
  cardType: PropTypes.oneOf(Object.values(PlaceCardType)).isRequired
};

export default PlaceCardProxy;
