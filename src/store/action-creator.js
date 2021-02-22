import ActionType from './actions';

const ActionCreator = {
  changeCity: (payload) => ({
    type: ActionType.CHANGE_SITY,
    payload
  }),
  updatePlaces: (payload) => ({
    type: ActionType.UPDATE_PLACES,
    payload
  }),
  updateComments: (payload) => ({
    type: ActionType.UPDATE_REVIEWS,
    payload
  })
};

export default ActionCreator;
