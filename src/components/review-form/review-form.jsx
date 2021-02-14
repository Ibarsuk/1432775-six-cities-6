import React, {useState} from "react";

import {raitings} from '../../const';

const ReviewForm = () => {
  const [state, setState] = useState({
    rating: null,
    review: ``
  });

  const handleFormChange = ({target: {name, value}}) => {
    setState({
      ...state,
      [name]: value
    });
  };

  return (
    <form className="reviews__form form" action="#" method="post" onChange={handleFormChange}>
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
        <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
      </div>
    </form>
  );
};

export default ReviewForm;
