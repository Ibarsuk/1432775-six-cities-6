import React from "react";
import {Router} from "react-router-dom";
import {render, screen} from "@testing-library/react";

import * as redux from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";

import {createMemoryHistory} from "history";
import {ApiRoutes, cities, Routes} from "../../const";
import {mockOffers, mockReviews} from "../../test-mocks";
import api from "../../api";

import App from "./app";


const initialState = {
  DATA: {
    offers: [],
    offersLoaded: true,
    favouriteOffers: [],
    favouriteOffersLoaded: true
  },
  USER: {
    isAuthorized: false,
    userInfo: {},
    isAuthChecked: false
  },
  WORK_PROCESS: {
    activeCity: cities.Amsterdam,
    activeOfferId: null
  }
};

const store = configureStore([thunk.withExtraArgument(api)]);

const mockApi = new MockAdapter(api);
describe(`Routing test`, () => {
  jest.spyOn(redux, `useSelector`);
  jest.spyOn(redux, `useDispatch`);
  it(`Render main-page on / url `, () => {
    const history = createMemoryHistory();
    render(
        <redux.Provider store={store(initialState)}>
          <Router history={history}>
            <App/>
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(`Amsterdam`)).toBeInTheDocument();
    expect(screen.getByText(`Sign in`)).toBeInTheDocument();
    expect(screen.getByText(`No places to stay available`)).toBeInTheDocument();
  });

  it(`Render authorization-page on /login url `, () => {
    const history = createMemoryHistory();
    history.push(Routes.LOGIN);
    render(
        <redux.Provider store={store(initialState)}>
          <Router history={history}>
            <App/>
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(`amsterdam`)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(`Email`)).toBeInTheDocument();
  });

  it(`Render authorization-page on /favorites url `, () => {
    const history = createMemoryHistory();
    history.push(Routes.FAVORITES);

    mockApi
    .onGet(ApiRoutes.FAVORITE)
    .reply(200, []);

    const testState = Object.assign(
        {},
        initialState,
        {
          USER: {
            isAuthorized: true,
            userInfo: {},
            isAuthChecked: true
          }
        }
    );
    render(
        <redux.Provider store={store(testState)}>
          <Router history={history}>
            <App/>
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(`Nothing yet saved.`)).toBeInTheDocument();
  });

  it(`Render authorization-page on /not-found url `, () => {
    const history = createMemoryHistory();
    history.push(Routes.NOT_FOUND);
    render(
        <redux.Provider store={store(initialState)}>
          <Router history={history}>
            <App/>
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(`Page not found`)).toBeInTheDocument();
    expect(screen.getByText(`To main page`)).toBeInTheDocument();
  });

  it(`Render authorization-page on invalid url `, () => {
    const history = createMemoryHistory();
    history.push(`/not-valid`);
    render(
        <redux.Provider store={store(initialState)}>
          <Router history={history}>
            <App/>
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(`Page not found`)).toBeInTheDocument();
    expect(screen.getByText(`To main page`)).toBeInTheDocument();
  });


  it(`Render property on /offer/:id`, () => {

    mockApi
      .onGet(`${ApiRoutes.HOTELS}/1`)
      .reply(200, mockOffers[0]);

    mockApi
      .onGet(`${ApiRoutes.HOTELS}/1/nearby`)
      .reply(200, mockOffers);

    mockApi
      .onGet(`${ApiRoutes.COMMENTS}/1`)
      .reply(200, mockReviews);

    const history = createMemoryHistory();
    history.push(`${Routes.OFFER}/1`);

    const testState = Object.assign(
        {},
        initialState,
        {
          USER: {
            isAuthorized: true,
            userInfo: {},
            isAuthChecked: true
          }
        }
    );

    render(
        <redux.Provider store={store(testState)}>
          <Router history={history}>
            <App/>
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(`What's inside`)).toBeInTheDocument();
    expect(screen.getByText(`Meet the host`)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(`Tell how was your stay, what you like and what can be improved`)).toBeInTheDocument();
  });

});
