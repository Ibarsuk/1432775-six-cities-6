import React from "react";
import FavouritesPageEmpty from "./favourites-page-empty";

import {render, screen} from "@testing-library/react";

it(`Favourites-page-empty component renders correctly`, () => {
  render(<FavouritesPageEmpty/>);

  expect(screen.getByText(`Nothing yet saved.`)).toBeInTheDocument();
  expect(screen.getByText(`Save properties to narrow down search or plan your future trips.`)).toBeInTheDocument();
});
