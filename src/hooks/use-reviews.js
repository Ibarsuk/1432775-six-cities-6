import {useEffect, useState} from "react";

import {fetchReviews} from "../store/api-actions";

export const useReviews = (offerID) => {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    fetchReviews(offerID)
      .then((newReviews) => setReviews(newReviews));
  }, [offerID]);

  return [reviews, setReviews];
};
