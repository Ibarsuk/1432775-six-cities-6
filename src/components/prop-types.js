import PropTypes from "prop-types";

import {accomodationType} from '../const';

export const placeCardProps = {
  preview: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  raiting: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  placeType: PropTypes.oneOf(Object.keys(accomodationType)).isRequired,
  isPremium: PropTypes.bool.isRequired,
  isFavourite: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
};
