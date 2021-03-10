import {configureStore} from "@reduxjs/toolkit";

import rootReducer from './reducers/root-reducer';

import api from '../api';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    })
});

export default store;
