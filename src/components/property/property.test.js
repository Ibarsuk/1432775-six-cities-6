import React from "react";
import {Router} from "react-router-dom";
import {act, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import * as redux from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import {createMemoryHistory} from "history";
import {Routes} from "../../const";
import {mockOffers, mockReviews} from "../../test-mocks";
import api, {adaptOfferToClient, adaptReviewToClient} from "../../api";
import MockAdapter from "axios-mock-adapter";

import * as useOffer from "../../hooks/use-offer";
import * as useNearOffers from "../../hooks/use-near-offers";
import * as useReviews from "../../hooks/use-reviews";

import Property from "./property";

describe(`Component property works correctly`, () => {
  let history;
  beforeEach(() => {
    history = createMemoryHistory();
    history.push(`${Routes.OFFER}/1`);
  });

  const mockApi = new MockAdapter(api);
  const offers = mockOffers.map(adaptOfferToClient);

  const store = configureStore([thunk.withExtraArgument(api)])({
    USER: {
      isAuthorized: true,
      userInfo: {},
      isAuthChecked: true
    },
    WORK_PROCESS: {
      activeOfferId: null
    },
    DATA: {
      offers,
      offersLoaded: true,
      favouriteOffers: offers,
      favouriteOffersLoaded: true
    },
  });

  const setOffer = jest.fn();
  jest.spyOn(useOffer, `useOffer`).mockImplementation(() =>({
    offer: offers[0],
    setOffer,
    fetchOffer: ()=>{}
  }));

  jest.spyOn(useNearOffers, `useNearOffers`).mockImplementation(() =>({
    nearOffers: offers,
    setNearOffers: ()=>{},
    fetchNearOffers: ()=>{}
  }));

  jest.spyOn(useReviews, `useReviews`).mockImplementation(() =>({
    reviews: mockReviews.map(adaptReviewToClient),
    reviewsSortedByDate: mockReviews,
    setReviews: ()=>{},
    fetchReviews: ()=>{}
  }));

  it(`Correct render`, () => {

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <Property/>
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(`What's inside`)).toBeInTheDocument();
    expect(screen.getByText(`Meet the host`)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(`Tell how was your stay, what you like and what can be improved`)).toBeInTheDocument();
    expect(screen.getAllByText(offers[0].title)).not.toHaveLength(0);
  });

  it(`Favourite button works correctly`, async () => {
    mockApi
    .onPost()
    .reply(200, mockOffers[0]);

    const {container} = render(
        <redux.Provider store={store}>
          <Router history={history}>
            <Property/>
          </Router>
        </redux.Provider>
    );

    const favouriteButton = container.querySelector(`.property__bookmark-button`);

    await act(async () => userEvent.click(favouriteButton));

    expect(setOffer).toHaveBeenCalledTimes(1);
    expect(favouriteButton).toHaveAttribute(`disabled`);
  });
});
