import {useOffer} from './use-offer';
import {act, renderHook} from "@testing-library/react-hooks";
import MockAdapter from "axios-mock-adapter";
import api, {adaptOfferToClient} from '../api';
import {ApiRoutes} from '../const';
import {mockOffers} from '../test-mocks';

const mockApi = new MockAdapter(api);

it(`Hook useOffer works correctly`, async () => {
  const testOffer = mockOffers[0];
  const offerToSet = {
    firstTestField: 1,
    secondTestField: 2
  };

  mockApi
  .onGet(`${ApiRoutes.HOTELS}/${testOffer.id}`)
  .reply(200, testOffer);

  const {result} = renderHook(() => useOffer());
  const {setOffer, fetchOffer} = result.current;
  let offer = result.current.offer;

  expect(offer).toBe(null);
  expect(setOffer).toBeInstanceOf(Function);
  expect(fetchOffer).toBeInstanceOf(Function);

  await act(async () => await fetchOffer(testOffer.id));
  offer = result.current.offer;

  expect(offer).toBeInstanceOf(Object);
  expect(offer).toEqual(adaptOfferToClient(testOffer));

  act(() => setOffer(offerToSet));
  offer = result.current.offer;

  expect(offer).toEqual(offerToSet);
});
