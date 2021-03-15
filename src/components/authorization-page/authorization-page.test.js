import React from "react";
import {Router} from "react-router";
import userEvent from "@testing-library/user-event";

import configureStore from "redux-mock-store";
import * as redux from "react-redux";

import {createMemoryHistory} from "history";
import {render, screen} from "@testing-library/react";
import {cities} from "../../const";
import {userInfo} from "../../test-mocks";

import AuthorizationPage from "./authorization-page";

let history;
const initialState = {
  USER: {
    isAuthorized: false,
    userInfo
  },
  WORK_PROCESS: {
    activeCity: cities.Amsterdam
  }
};
describe(`Authorization-page works correctly`, () => {
  const store = configureStore()(initialState);
  beforeEach(() => {
    history = createMemoryHistory();
  });
  it(`Authorization-page renders correctly`, () => {
    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <AuthorizationPage/>
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(`amsterdam`)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(`Email`)).toBeInTheDocument();
  });

  it(`Form works correctly`, () => {
    const dispatch = jest.fn();
    jest.spyOn(redux, `useDispatch`).mockImplementation(() => dispatch);
    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <AuthorizationPage/>
          </Router>
        </redux.Provider>
    );

    userEvent.type(screen.getByPlaceholderText(`Email`), `test-text`);
    expect(screen.getByDisplayValue(`test-text`)).toBeInTheDocument();

    userEvent.click(screen.getByRole(`button`, {name: `Sign in`}));
    expect(dispatch).toHaveBeenCalled();
  });
});

