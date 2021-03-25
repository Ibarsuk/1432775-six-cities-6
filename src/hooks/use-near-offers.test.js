import {useNearOffers} from './use-near-offers';
import {act, renderHook} from "@testing-library/react-hooks";
import MockAdapter from "axios-mock-adapter";
import api, {adaptOfferToClient} from '../api';
import {ApiRoutes} from '../const';
import {mockOffers} from '../test-mocks';

const mockApi = new MockAdapter(api);

it(`Hook useNearOffers works correctly`, async () => {
  const offersToSet = [1, 453, 222];

  mockApi
  .onGet(`${ApiRoutes.HOTELS}/1/nearby`)
  .reply(200, mockOffers);

  const {result} = renderHook(() => useNearOffers());
  const {setNearOffers, fetchNearOffers} = result.current;
  let nearOffers = result.current.nearOffers;

  expect(nearOffers).toEqual([]);
  expect(setNearOffers).toBeInstanceOf(Function);
  expect(fetchNearOffers).toBeInstanceOf(Function);

  await act(async () => await fetchNearOffers(1));
  nearOffers = result.current.nearOffers;

  expect(nearOffers).toBeInstanceOf(Array);
  expect(nearOffers).toEqual(mockOffers.map(adaptOfferToClient));

  act(() => setNearOffers(offersToSet));
  nearOffers = result.current.nearOffers;

  expect(nearOffers).toEqual(offersToSet);
});
