import * as React from "react";

import {Router} from "react-router";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import * as redux from "react-redux";
import configureStore from "redux-mock-store";

import {createMemoryHistory} from "history";
import {mockOffers} from "../../test-mocks";
import {adaptOfferToClient} from "../../api";

import OffersList from "./offers-list";
describe(`Offers-list component works correctly`, () => {
  const offers = mockOffers.map(adaptOfferToClient);
  const store = configureStore()({
    WORK_PROCESS: {
      activeOfferId: null
    },
    USER: {
      isAuthorized: true
    }
  });
  it(`Correct render`, () => {
    const history = createMemoryHistory();

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <OffersList offers={offers} cityName={offers[0].city.name}/>
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(offers[0].title)).toBeInTheDocument();
    expect(screen.getByText(`Places`)).toBeInTheDocument();
  });

  it(`Clears activeOffer on unmount`, () => {
    const dispatch = jest.fn();
    jest.spyOn(redux, `useDispatch`).mockImplementation(() => dispatch);
    const history = createMemoryHistory();

    const {unmount} = render(
        <redux.Provider store={store}>
          <Router history={history}>
            <OffersList offers={offers} cityName={offers[0].city.name}/>
          </Router>
        </redux.Provider>
    );

    unmount();
    expect(dispatch).toHaveBeenCalled();
  });

  it(`Sort buttons call setState`, () => {
    const mockSetState = jest.fn();
    const mockUseState = (state) => [state, 123];

    // Еще один проблемый тест. В данном случае не происходит замена реального useState на переопределенный
    // Оба способа ниже не работают

    // jest.mock(`react`, () => ({
    //   ...jest.requireActual(`react`),
    //   useState: (state) => [state, mockSetState]
    // }));

    jest.spyOn(React, `useState`).mockImplementation(mockUseState);

    const history = createMemoryHistory();

    const {container} = render(
        <redux.Provider store={store}>
          <Router history={history}>
            <OffersList offers={offers} cityName={offers[0].city.name}/>
          </Router>
        </redux.Provider>
    );

    userEvent.click(container.querySelector(`.places__sorting-type`));
    expect(mockSetState).toHaveBeenCalled();
  });
});
