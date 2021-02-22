import PropTypes from "prop-types";
import {accomodationType, cities} from '../const';

export const location = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  zoom: PropTypes.number
};

export const propOffer = {
  city: PropTypes.shape({
    location: PropTypes.shape(location),
    name: PropTypes.oneOf(Object.keys(cities))
  }).isRequired,
  host: PropTypes.shape({
    avatarUrl: PropTypes.string,
    isPro: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  maxAdults: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  goods: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string,
  bedrooms: PropTypes.number.isRequired,
  location: PropTypes.shape(location),
  preview: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  raiting: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  placeType: PropTypes.oneOf(Object.keys(accomodationType)).isRequired,
  isPremium: PropTypes.bool.isRequired,
  isFavourite: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
};

export const propReview = {
  comment: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  rating: PropTypes.number.isRequired,
  user: PropTypes.shape({
    avatarUrl: PropTypes.string,
    name: PropTypes.string.isRequired
  }).isRequired
};
