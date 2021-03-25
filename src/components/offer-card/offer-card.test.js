import React from "react";
import {Router} from "react-router";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import * as redux from "react-redux";
import configureStore from "redux-mock-store";

import {mockOffers} from "../../test-mocks";
import {OfferCardType} from "../../const";
import {adaptOfferToClient} from "../../api";
import {createMemoryHistory} from "history";

import OfferCardProxy from "./offer-card-proxy";

describe(`Offer-card works correctly`, () => {
  const testOffer = adaptOfferToClient({...mockOffers[0]});
  let history;
  beforeEach(() => {
    history = createMemoryHistory();
  });
  it(`Correct render`, () => {
    const store = configureStore()({
      USER: {
        isAuthorized: true
      }
    });
    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <OfferCardProxy {...testOffer} cardType={OfferCardType.CITIES}/>
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(testOffer.title)).toBeInTheDocument();
    expect(screen.getByAltText(`Place image`)).toBeInTheDocument();
  });

  it(`OnMouseOver is called on hover`, () => {
    const onMouseOver = jest.fn();
    const store = configureStore()({
      USER: {
        isAuthorized: true
      }
    });
    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <OfferCardProxy {...testOffer} cardType={OfferCardType.CITIES} onMouseOver={onMouseOver}/>
          </Router>
        </redux.Provider>
    );

    userEvent.hover(screen.getByText(testOffer.title));
    expect(onMouseOver).toBeCalled();
  });

  it(`Sets new favourite status`, () => {
    const dispatch = jest.fn();

    jest.spyOn(redux, `useDispatch`).mockImplementation(() => dispatch);
    const store = configureStore()({
      USER: {
        isAuthorized: true
      }
    });
    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <OfferCardProxy {...testOffer} cardType={OfferCardType.CITIES}/>
          </Router>
        </redux.Provider>
    );

    userEvent.click(screen.getByText(`In bookmarks`));
    expect(dispatch).toBeCalled();
  });
});

