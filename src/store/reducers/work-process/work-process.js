import {createReducer} from '@reduxjs/toolkit';

import ActionType from '../../actions';
import {cities} from '../../../const';


const initialState = {
  activeCity: cities.Paris,
  activeOfferId: null
};

const workProcessReducer = createReducer(initialState, (builder) => {
  builder.addCase(ActionType.CHANGE_CITY, (state, action) => {
    state.activeCity = action.payload;
  });
  builder.addCase(ActionType.UPDATE_ACTIVE_OFFER, (state, action) => {
    state.activeOfferId = action.payload;
  });
});

export default workProcessReducer;
