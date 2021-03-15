import {render, screen} from "@testing-library/react";
import React from "react";

import * as redux from "react-redux";
import configureStore from "redux-mock-store";
import {adaptOfferToClient} from "../../api";

import {cities} from "../../const";
import {mockOffers} from "../../test-mocks";

import Map from "./map";
it(`Map conmponent renders correctly`, () => {
  const initiaState = {
    WORK_PROCESS: {
      activeCity: cities.Amsterdam,
      activeOfferId: null
    }
  };

  const store = configureStore()(initiaState);
  const {container} = render(
      <redux.Provider store={store}>
        <Map offers={mockOffers.map(adaptOfferToClient)}/>
      </redux.Provider>
  );

  expect(screen.getByText(`Leaflet`)).toBeInTheDocument();
  expect(container.querySelector(`.leaflet-marker-icon`)).toBeInTheDocument();
});
