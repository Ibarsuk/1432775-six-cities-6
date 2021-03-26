import {useState} from "react";

import {fetchReviews as reviewsLoader} from "../store/api-actions";

export const useReviews = () => {
  const [reviews, setAllReviewTypes] = useState({
    pure: [],
    sortedByDate: []
  });

  const setReviews = (reviewsToSet) => setAllReviewTypes({
    pure: reviewsToSet,
    sortedByDate: reviewsToSet.slice().sort((previous, current) => +current.date - +previous.date)
  });

  const fetchReviews = (offerId) =>
    reviewsLoader(offerId)
    .then((newReviews) => setReviews(newReviews));

  return {
    reviews: reviews.pure,
    reviewsSortedByDate: reviews.sortedByDate,
    setReviews,
    fetchReviews
  };
};
