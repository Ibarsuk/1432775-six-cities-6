import React from "react";
import {Router} from "react-router";
import {render, screen} from "@testing-library/react";

import * as redux from "react-redux";
import configureStore from "redux-mock-store";

import {createMemoryHistory} from "history";

import MainPage from "./main-page";

it(`Correct render when not empty`, () => {
  const history = createMemoryHistory();

  const store = configureStore()({
    DATA: {
      offers: [],
      offersLoaded: true
    },
    WORK_PROCESS: {
      activeCity: `amsterdam`,
      activeOfferId: null
    },
    USER: {
      userInfo: {},
      isAuthorized: false
    }
  });

  render(
      <redux.Provider store={store}>
        <Router history={history}>
          <MainPage/>
        </Router>
      </redux.Provider>
  );

  expect(screen.getByText(`Cities`)).toBeInTheDocument();
  expect(screen.getByText(`Amsterdam`)).toBeInTheDocument();
});
