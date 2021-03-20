import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {reviewPropTypes} from "./prop-types";

import Review from "./review/review";

const ReviewsList = ({reviews}) => {
  const sortedReviews = useMemo(
      () => reviews.sort((previous, current) => +new Date(previous.date) - +new Date(current.date)),
      [reviews]
  );

  return (
    <ul className="reviews__list">
      {sortedReviews.map((review, i) => <Review key={`review${i}`} {...review} />)}
    </ul>
  );
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape(reviewPropTypes))
};

export default ReviewsList;
