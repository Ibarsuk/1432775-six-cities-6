import {createReducer} from '@reduxjs/toolkit';

import ActionType from '../../actions';

const initialState = {
  isAuthorized: false,
  userInfo: {},
  isAuthChecked: false
};

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(ActionType.AUTHORIZE, (state, action) => {
    state.userInfo = action.payload.userInfo;
    state.isAuthorized = action.payload.isAuthorized;
  });
  builder.addCase(ActionType.SET_AUTH_CHECKED, (state) => {
    state.isAuthChecked = true;
  });
});

export default userReducer;
