import {useState} from "react";

import {fetchReviews as reviewsLoader} from "../store/api-actions";

export const useReviews = () => {
  const [reviews, setReviews] = useState({
    pure: [],
    sortedByDate: []
  });

  const fetchReviews = (offerId) =>
    reviewsLoader(offerId)
    .then((newReviews) => setReviews({
      pure: newReviews,
      sortedByDate: newReviews.slice().sort((previous, current) => +current.date - +previous.date)
    }));

  return {
    reviews: reviews.pure,
    reviewsSortedByDate: reviews.sortedByDate,
    setReviews,
    fetchReviews
  };
};
