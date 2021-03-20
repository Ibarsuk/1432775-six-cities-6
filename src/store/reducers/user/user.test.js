import ActionType from '../../actions';
import userReducer from './user';

describe(`User reducer works correctly`, () => {
  const initialState = {
    isAuthorized: false,
    userInfo: {},
    isAuthChecked: false
  };
  it(`Reducer should set user info and change isAuthorized status`, () => {
    const userInfo = {id: 1, isPro: true};

    const action = {
      type: ActionType.AUTHORIZE,
      payload: {
        userInfo,
        isAuthorized: true
      }
    };

    const expectedState = Object.assign(
        {},
        initialState,
        {
          userInfo: action.payload.userInfo,
          isAuthorized: true
        }
    );

    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it(`Reducer should set authorization "checked" status`, () => {
    const action = {
      type: ActionType.SET_AUTH_CHECKED
    };

    const expectedState = Object.assign(
        {},
        initialState,
        {
          isAuthChecked: true
        }
    );

    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it(`Reducer without additional parameters should return initial state`, () => {
    expect(userReducer(undefined, {})).toEqual(initialState);
  });
});
