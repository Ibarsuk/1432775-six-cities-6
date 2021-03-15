import {useOffer} from './use-offer';
import {renderHook} from "@testing-library/react-hooks";
import MockAdapter from "axios-mock-adapter";
import api, {adaptOfferToClient} from '../api';
import {ApiRoutes} from '../const';
import {mockOffers} from '../test-mocks';

const mockApi = new MockAdapter(api);
// Один из проблемных тестов. Jest не ждет, пока пройдет запрос к замоканному api, и сразу переходит к expect(),
// а уже потом приходят данные, из-за чего происходит ошибка
describe(`Hook useOffer works correctly`, () => {
  it(`Returns array with 2 elements: 1st - offer, 2nd - function to change offer`, () => {
    const testOffer = mockOffers[0];
    // const adaptedTestOffer = adaptOfferToClient({...testOffer});

    mockApi
    .onGet(`${ApiRoutes.HOTELS}/${testOffer.id}`)
    .reply(200, testOffer);

    const {result: {current}} = renderHook(() => useOffer(testOffer.id));
    const [offer, setOffer] = current;

    expect(current).toHaveLength(2);
    expect(offer).toBeInstanceOf(Object);
    expect(setOffer).toBeInstanceOf(Function);
  });
});
