import React from "react";
import {Router} from "react-router";
import {render, screen} from "@testing-library/react";

import * as redux from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";

import {createMemoryHistory} from "history";
import api, {adaptOfferToClient} from "../../api";
import {mockOffers} from "../../test-mocks";

import FavouritesPage from "./favourites-page";

it(`Favourites-page component works correctly`, () => {
  const adaptedMockOffers = mockOffers.map(adaptOfferToClient);

  jest.spyOn(redux, `useDispatch`);

  const store = configureStore([thunk.withExtraArgument(api)])({
    USER: {
      userInfo: {},
      isAuthorized: false
    },
    WORK_PROCESS: {
      activeCity: ``,
    },
    DATA: {
      favouriteOffers: adaptedMockOffers,
      favouriteOffersLoaded: true
    }
  });
  const history = createMemoryHistory();
  render(
      <redux.Provider store={store}>
        <Router history={history}>
          <FavouritesPage/>
        </Router>
      </redux.Provider>
  );

  expect(screen.getByText(`Saved listing`)).toBeInTheDocument();
  expect(screen.getByText(adaptedMockOffers[0].title)).toBeInTheDocument();
});
