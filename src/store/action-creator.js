import ActionType from './actions';

const ActionCreator = {
  changeCity: (payload) => ({
    type: ActionType.CHANGE_CITY,
    payload
  }),
  updateActiveOffer: (payload) => ({
    type: ActionType.UPDATE_ACTIVE_OFFER,
    payload
  }),
  loadOffers: (payload) => ({
    type: ActionType.LOAD_OFFERS,
    payload
  }),
  changeAuth: (payload) => ({
    type: ActionType.CHANGE_AUTH,
    payload
  }),
  authorize: (payload) => ({
    type: ActionType.AUTHORIZE,
    payload
  })
};

export default ActionCreator;
