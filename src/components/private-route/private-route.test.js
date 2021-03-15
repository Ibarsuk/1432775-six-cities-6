import React from "react";
import {Route, Router} from "react-router";

import * as redux from "react-redux";

import {createMemoryHistory} from "history";
import {render, screen} from "@testing-library/react";

import configureStore from "redux-mock-store";
import PrivateRoute from "./private-route";

describe(`Private-route works correctly`, () => {
  let history;
  const Private = () => <h1>Private</h1>;
  beforeEach(() => {
    history = createMemoryHistory();
    history.push(`/private`);
  });
  it(`Renders Loading when authorization is not checked`, () => {
    const store = configureStore()({
      USER: {
        isAuthorized: false,
        isAuthChecked: false
      }
    });

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <Route path={`/login`}><h1>Public</h1></Route>
            <PrivateRoute path={`/private`} exact component={Private}/>
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(`Loading`, {exact: false})).toBeInTheDocument();
  });

  it(`Renders Login when is not authorized`, () => {
    const store = configureStore()({
      USER: {
        isAuthorized: false,
        isAuthChecked: true
      }
    });

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <Route path={`/login`}><h1>Public</h1></Route>
            <PrivateRoute path={`/private`} exact component={Private}/>
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(`Public`)).toBeInTheDocument();
  });

  it(`Renders passed component when authorized`, () => {
    const store = configureStore()({
      USER: {
        isAuthorized: true,
        isAuthChecked: true
      }
    });

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <Route path={`/login`}><h1>Public</h1></Route>
            <PrivateRoute path={`/private`} exact component={Private}/>
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(`Private`)).toBeInTheDocument();
  });
});

