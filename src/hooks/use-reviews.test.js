import {useReviews} from './use-reviews';
import {act, renderHook} from "@testing-library/react-hooks";
import MockAdapter from "axios-mock-adapter";
import api, {adaptReviewToClient} from '../api';
import {ApiRoutes} from '../const';
import {mockReviews} from '../test-mocks';

const mockApi = new MockAdapter(api);

it(`Hook useNearOffers works correctly`, async () => {
  const mockReviewsSortedByDate = mockReviews.slice().sort((previous, current) => +current.date - +previous.date);
  const randomNumbers = [1, 55, 521];

  mockApi
  .onGet(`${ApiRoutes.COMMENTS}/1`)
  .reply(200, mockReviews);

  const {result} = renderHook(() => useReviews());
  const {setReviews, fetchReviews} = result.current;
  let reviews = result.current.reviews;
  let reviewsSortedByDate = result.current.reviewsSortedByDate;

  expect(reviews).toEqual([]);
  expect(reviewsSortedByDate).toEqual([]);
  expect(setReviews).toBeInstanceOf(Function);
  expect(fetchReviews).toBeInstanceOf(Function);

  await act(async () => await fetchReviews(1));
  reviews = result.current.reviews;
  reviewsSortedByDate = result.current.reviewsSortedByDate;

  expect(reviews).toBeInstanceOf(Array);
  expect(reviews).toEqual(mockReviews.map(adaptReviewToClient));

  expect(reviewsSortedByDate).toBeInstanceOf(Array);
  expect(reviewsSortedByDate).toEqual(mockReviewsSortedByDate);

  act(() => setReviews(randomNumbers));
  reviews = result.current.reviews;
  reviewsSortedByDate = result.current.reviewsSortedByDate;

  expect(reviews).toEqual(randomNumbers);
  expect(reviewsSortedByDate).toEqual(randomNumbers);
});
