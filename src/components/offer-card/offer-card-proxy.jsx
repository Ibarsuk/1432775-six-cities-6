import React from "react";
import PropTypes from "prop-types";

import {OfferCardType} from '../../const';
import OfferCard from './offer-card';

const cardOptions = {
  [OfferCardType.FAVOURITE]: {
    cardClassname: `favorites__card`,
    imgWrapperClassname: `favorites`,
    imgSizes: {
      width: 150,
      height: 110
    }
  },
  [OfferCardType.NEAR]: {
    cardClassname: `near-places__card`,
    imgWrapperClassname: `near-places`,
    imgSizes: {
      width: 260,
      height: 200
    }
  },
  [OfferCardType.CITIES]: {
    cardClassname: `cities__place-card`,
    imgWrapperClassname: `cities`,
    imgSizes: {
      width: 260,
      height: 200
    }
  }
};

const OfferCardProxy = (props) => {
  const options = cardOptions[props.cardType];

  return <OfferCard
    cardClassname={options.cardClassname}
    imgWrapperClassname={options.imgWrapperClassname}
    mainImgSize={options.imgSizes}
    {...props}
  />;
};

OfferCardProxy.propTypes = {
  cardType: PropTypes.oneOf(Object.values(OfferCardType)).isRequired
};

export default OfferCardProxy;
