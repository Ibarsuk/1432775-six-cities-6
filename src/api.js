import axios from "axios";

const URL = `https://6.react.pages.academy/six-cities`;
const TIMEOUT = 5000;

export const createApi = () => {
  const api = axios.create({
    baseURL: URL,
    timeout: TIMEOUT,
    withCredentials: true
  });
  return api;
};

const api = createApi();

export const adaptOfferToClient = (offer) => {
  offer.isFavourite = offer.is_favorite;
  offer.isPremium = offer.is_premium;
  offer.maxAdults = offer.max_adults;
  offer.preview = offer.preview_image;
  offer.placeType = offer.type;
  offer.raiting = offer.rating;
  offer.host.avatarUrl = offer.host.avatar_url;
  offer.host.isPro = offer.host.is_pro;

  delete offer.is_favorite;
  delete offer.is_premium;
  delete offer.max_adults;
  delete offer.preview_image;
  delete offer.type;
  delete offer.rating;
  delete offer.host.avatar_url;
  delete offer.host.is_pro;

  return offer;
};

export const adaptReviewToClient = (review) => {
  review.user.avatarUrl = review.user.avatar_url;
  review.user.isPro = review.user.is_pro;
  review.date = new Date(review.date);

  delete review.user.avatar_url;
  delete review.user.is_pro;

  return review;
};

export const adaptUserInfoToClient = (userInfo) => {
  userInfo.avatarUrl = userInfo.avatar_url;
  userInfo.isPro = userInfo.is_pro;

  delete userInfo.avatar_url;
  delete userInfo.is_pro;

  return userInfo;
};

export default api;
