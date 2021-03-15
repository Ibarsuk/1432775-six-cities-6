import React from "react";
import Footer from "./footer";

import {render, screen} from "@testing-library/react";
import {Router} from "react-router";
import {createMemoryHistory} from "history";

it(`Footer component renders correctly`, () => {
  const history = createMemoryHistory();
  render(
      <Router history={history}>
        <Footer/>
      </Router>
  );

  expect(screen.getByAltText(`6 cities logo`)).toBeInTheDocument();
});
