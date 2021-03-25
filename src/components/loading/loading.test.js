import React from "react";
import Loading from "./loading";

import {render, screen} from "@testing-library/react";

it(`Loading component renders correctly`, () => {
  render(<Loading/>);

  expect(screen.getByText(`Loading`, {exact: false})).toBeInTheDocument();
});
