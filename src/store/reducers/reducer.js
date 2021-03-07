import initialState from '../initial-state';
import ActionType from '../actions';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        activeCity: action.payload
      };
    case ActionType.UPDATE_ACTIVE_OFFER:
      return {
        ...state,
        activeOfferId: action.payload
      };
    case ActionType.LOAD_OFFERS:
      return {
        ...state,
        offers: action.payload,
        areOffersLoaded: true
      };
    case ActionType.CHANGE_AUTH:
      return {
        ...state,
        isAuthorized: action.payload
      };
    case ActionType.AUTHORIZE:
      return {
        ...state,
        userInfo: action.payload
      };
    case ActionType.SET_IF_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
