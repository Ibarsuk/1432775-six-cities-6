import React from "react";
import Review from "./review";

import {render, screen} from "@testing-library/react";

it(`Review component renders correctly`, () => {
  const userInfo = {
    avatarUrl: `img/avatar-max.jpg`,
    id: 1,
    isPro: false,
    name: `Ann`
  };
  render(
      <Review
        comment={`best of the best`}
        date={new Date(1613549068647)}
        rating={4.4}
        user={userInfo}
      />
  );

  expect(screen.getByText(`Wed Feb 17 2021`)).toBeInTheDocument();
  expect(screen.getByText(`best of the best`)).toBeInTheDocument();
  expect(screen.getByText(userInfo.name)).toBeInTheDocument();
  expect(screen.getByAltText(`Reviews avatar`)).toBeInTheDocument();
});
