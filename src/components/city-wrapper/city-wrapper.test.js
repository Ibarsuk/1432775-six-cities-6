import React from "react";
import {Route, Router, Switch} from "react-router";
import {render, screen} from "@testing-library/react";

import * as redux from "react-redux";
import configureStore from "redux-mock-store";

import {createMemoryHistory} from "history";
import {cities, Routes} from "../../const";
import {mockOffers} from "../../test-mocks";
import {adaptOfferToClient} from "../../api";

import CityWrapper from "./city-wrapper";

describe(`City-wrapper component works correctly`, () => {
  const testOffers = mockOffers.map(adaptOfferToClient);
  const existingCity = testOffers[0].city.name;
  it(`Correct render when not empty`, () => {
    const history = createMemoryHistory();
    history.push(`${Routes.CITIES}/${existingCity.toLowerCase()}`);

    const store = configureStore()({
      DATA: {
        offers: testOffers
      },
      WORK_PROCESS: {
        activeCity: existingCity.toLowerCase(),
        activeOfferId: null
      },
      USER: {
        isAuthorized: true
      }
    });

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <Switch>
              <Route path={`${Routes.CITIES}/:city`}>
                <CityWrapper/>
              </Route>
            </Switch>
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(`Sort by`, {exact: false})).toBeInTheDocument();
  });

  it(`Correct render when empty`, () => {
    const history = createMemoryHistory();
    history.push(`${Routes.CITIES}/London`);

    const store = configureStore()({
      DATA: {
        offers: []
      },
      WORK_PROCESS: {
        activeCity: null
      }
    });

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <Switch>
              <Route path={`${Routes.CITIES}/:city`}>
                <CityWrapper/>
              </Route>
            </Switch>
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(`No places to stay available`)).toBeInTheDocument();
  });

  it(`Dispatches actual activeCity if url param "city" doesn't match activeCity in redux`, () => {
    const dispatch = jest.fn();
    jest.spyOn(redux, `useDispatch`).mockImplementation(() => dispatch);

    const history = createMemoryHistory();
    history.push(`${Routes.CITIES}/${existingCity.toLowerCase()}`);

    const store = configureStore()({
      DATA: {
        offers: testOffers
      },
      WORK_PROCESS: {
        activeCity: existingCity.toLowerCase() === cities.Amsterdam ? cities.Dusseldorf : cities.Amsterdam,
        activeOfferId: null
      },
      USER: {
        isAuthorized: true
      }
    });

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <Switch>
              <Route path={`${Routes.CITIES}/:city`}>
                <CityWrapper/>
              </Route>
            </Switch>
          </Router>
        </redux.Provider>
    );

    expect(dispatch).toHaveBeenCalled();
  });
});
