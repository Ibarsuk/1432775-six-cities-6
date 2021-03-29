import React from "react";
import ReviewForm from "./review-form";
import * as fetchers from '../../store/api-actions';
import userEvent from "@testing-library/user-event";

import {act, render, screen} from "@testing-library/react";

describe(`Review-form component works correctly`, () => {
  it(`correct render`, () => {
    render(
        <ReviewForm
          onReviewsChange={() => {}}
          offerId={1}
        />
    );

    expect(screen.getByText(`Submit`)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(`Tell how was your stay, what you like and what can be improved`)).toBeInTheDocument();
  });

  it(`onReviewsChange is called on form submit`, async () => {
    const onReviewsChange = jest.fn();
    const randomNumbers = [1, 2, 44, 1396];
    jest.spyOn(fetchers, `postReview`).mockImplementation(async () => randomNumbers);

    const {container} = render(
        <ReviewForm
          onReviewsChange={onReviewsChange}
          offerId={1}
        />
    );

    userEvent.paste(container.querySelector(`.reviews__textarea`), new Array(51).fill().map(() => `.`).join(``));
    userEvent.click(screen.getByDisplayValue(`4`));
    await act(async () => await userEvent.click(container.querySelector(`.reviews__submit`)));

    expect(onReviewsChange).toHaveBeenCalledWith(randomNumbers);
  });
});

