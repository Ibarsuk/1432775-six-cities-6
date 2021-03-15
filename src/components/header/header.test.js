import React from "react";
import {Router} from "react-router";

import * as redux from "react-redux";

import {createMemoryHistory} from "history";
import {render, screen} from "@testing-library/react";

import Header from "./header";
import configureStore from "redux-mock-store";

it(`Header component renders correctly`, () => {
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
          <Header/>
        </Router>
      </redux.Provider>
  );

  expect(screen.getByAltText(`6 cities logo`)).toBeInTheDocument();
});
