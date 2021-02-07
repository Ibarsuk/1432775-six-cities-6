import React from "react";
import PropTypes from "prop-types";

const Review = (props) => {
  const {
    reviewInfo: {
      comment,
      date,
      rating,
      user: {
        avatarUrl,
        name = `User name`
      }
    }
  } = props;
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={avatarUrl} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">
          {name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${rating * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={date}>{new Date(date).toDateString()}</time>
      </div>
    </li>
  );
};

Review.propTypes = {
  reviewInfo: PropTypes.shape({
    comment: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    rating: PropTypes.number.isRequired,
    user: PropTypes.shape({
      avatarUrl: PropTypes.string,
      name: PropTypes.string.isRequired
    })
  })
};

export default Review;
