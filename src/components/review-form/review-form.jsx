import React, {useRef, useState} from "react";
import PropTypes from "prop-types";

import {raitings, Animation} from '../../const';
import {postReview} from '../../store/api-actions';

const FormField = {
  RATING: `rating`,
  REVIEW: `review`
};

const initialState = {
  [FormField.RATING]: null,
  [FormField.REVIEW]: ``
};

const CommentLength = {
  MIN: 50,
  MAX: 300
};


const ReviewForm = ({onReviewsChange, offerId}) => {
  const [state, setState] = useState(initialState);

  const formRef = useRef();

  const {rating, review} = state;
  const isSubmitButtonDisabled = !(rating && review.length > CommentLength.MIN && review.length <= CommentLength.MAX);

  const handleFormChange = () => {
    const formData = new FormData(formRef.current);
    setState({
      [FormField.RATING]: formData.get(FormField.RATING),
      [FormField.REVIEW]: formData.get(FormField.REVIEW)
    });
  };

  const onFetchError = () => {
    formRef.current.classList.add(Animation.SHAKE.className);
    setTimeout(() => formRef.current.classList.remove(Animation.SHAKE.className), Animation.SHAKE.duration);
  };

  const onFetchSuccess = () => {
    formRef.current.reset();
    setState(initialState);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    postReview(offerId, {
      "comment": review,
      "rating": rating
    })
    .then((newReviews) => onReviewsChange(newReviews))
    .then(onFetchSuccess)
    .catch(onFetchError);
  };

  return (
    <form className="reviews__form form" action="#" method="post" onChange={handleFormChange} onSubmit={handleSubmit} ref={formRef}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {raitings.map((raitingName, i) => (
          <React.Fragment key={raitingName + i}>
            <input className="form__rating-input visually-hidden" name="rating" value={raitings.length - i} id={`${raitings.length - i}-star`} type="radio"/>
            <label htmlFor={`${raitings.length - i}-star`} className="reviews__rating-label form__rating-label" title={raitingName}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                      To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isSubmitButtonDisabled}>Submit</button>
      </div>
    </form>
  );
};

ReviewForm.propTypes = {
  onReviewsChange: PropTypes.func.isRequired,
  offerId: PropTypes.number
};

export default ReviewForm;
