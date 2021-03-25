import React from "react";
import ReviewForm from "./review-form";

import {render, screen} from "@testing-library/react";

it(`Review-form component renders correctly`, () => {
  render(
      <ReviewForm
        onReviewsChange={() => {}}
        offerId={1}
      />
  );

  expect(screen.getByText(`Submit`)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(`Tell how was your stay, what you like and what can be improved`)).toBeInTheDocument();
});
