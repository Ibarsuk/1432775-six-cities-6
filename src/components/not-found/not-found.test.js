import React from "react";
import {Router} from "react-router";

import * as redux from "react-redux";
import configureStore from "redux-mock-store";

import {createMemoryHistory} from "history";
import {render, screen} from "@testing-library/react";

import NotFound from "./not-found";

it(`Not-found component renders correctly`, () => {
  jest.spyOn(redux, `useSelector`);
  jest.spyOn(redux, `useDispatch`);

  const store = configureStore()({
    USER: {
      userInfo: {},
      isAuthorized: false
    },
    WORK_PROCESS: {
      activeCity: ``,
    }
  });
  const history = createMemoryHistory();
  render(
      <redux.Provider store={store}>
        <Router history={history}>
          <NotFound/>
        </Router>
      </redux.Provider>
  );

  expect(screen.getByText(`Page not found`)).toBeInTheDocument();
});
