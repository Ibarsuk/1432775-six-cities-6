import initialState from '../initial-state';
import ActionType from '../actions';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_SITY:
      return {
        ...state,
        activeCity: action.payload
      };
    case ActionType.UPDATE_PLACES:
      return {
        ...state,
        places: action.payload
      };
    case ActionType.UPDATE_REVIEWS:
      return {
        ...state,
        reviews: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
