import React from "react";
import {render, screen} from "@testing-library/react";

import {createMemoryHistory} from "history";

import CityWrapperEmpty from "./city-wrapper-empty";
import {Route, Router} from "react-router";

it(`City-wrapper-empty component renders correctly`, () => {
  const history = createMemoryHistory();
  history.push(`/London`);

  render(
      <Router history={history}>
        <Route path={`/:city`} exact component={CityWrapperEmpty}/>
      </Router>
  );

  expect(screen.getByText(`No places to stay available`)).toBeInTheDocument();
  expect(screen.getByText(`We could not find any property available at the moment in London`)).toBeInTheDocument();
});
