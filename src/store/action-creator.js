import ActionType from './actions';

const ActionCreator = {
  changeCity: (payload) => ({
    type: ActionType.CHANGE_SITY,
    payload
  }),
  updateOffers: (payload) => ({
    type: ActionType.UPDATE_OFFERS,
    payload
  }),
  updateComments: (payload) => ({
    type: ActionType.UPDATE_REVIEWS,
    payload
  })
};

export default ActionCreator;
