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
  }),
  setAuthChecked: () => ({
    type: ActionType.SET_IF_AUTH_CHECKED,
    payload: true
  })
};

export default ActionCreator;
