import React from "react";
import {Router} from "react-router";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import configureStore from "redux-mock-store";
import * as redux from "react-redux";

import {createMemoryHistory} from "history";

import CitiesMenu from "./cities-menu";

describe(`Cities-menu component works correctly`, () => {
  const store = configureStore()({});
  let history;

  beforeEach(() => {
    history = createMemoryHistory();
  });
  it(`correct render`, () => {
    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <CitiesMenu/>
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(`Amsterdam`)).toBeInTheDocument();
  });

  it(`correct render`, () => {
    const dispatch = jest.fn();
    jest.spyOn(redux, `useDispatch`).mockImplementation(() => dispatch);
    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <CitiesMenu/>
          </Router>
        </redux.Provider>
    );

    userEvent.click(screen.getByText(`Amsterdam`));
    expect(dispatch).toHaveBeenCalled();
  });
});


