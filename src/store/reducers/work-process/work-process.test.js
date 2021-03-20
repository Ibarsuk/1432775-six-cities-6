import {cities} from '../../../const';
import ActionType from '../../actions';
import workProcessReducer from './work-process';

describe(`Work-process reducer works correctly`, () => {
  const initialState = {
    activeCity: cities.Paris,
    activeOfferId: null
  };

  it(`Reducer should update actifeCity`, () => {
    const newActiveCity = `London`;

    const action = {
      type: ActionType.CHANGE_CITY,
      payload: newActiveCity
    };

    const expectedState = Object.assign(
        {},
        initialState,
        {
          activeCity: newActiveCity
        }
    );

    expect(workProcessReducer(initialState, action)).toEqual(expectedState);
  });

  it(`Reducer should update actifeOfferId`, () => {
    const newActifeOfferId = 1;

    const action = {
      type: ActionType.UPDATE_ACTIVE_OFFER,
      payload: newActifeOfferId
    };

    const expectedState = Object.assign(
        {},
        initialState,
        {
          activeOfferId: newActifeOfferId
        }
    );

    expect(workProcessReducer(initialState, action)).toEqual(expectedState);
  });

  it(`Reducer without additional parameters should return initial state`, () => {
    expect(workProcessReducer(undefined, {})).toEqual(initialState);
  });
});
