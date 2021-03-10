import {ReducerNameSpace} from '../root-reducer';

export const getUserInfo = (state) => state[ReducerNameSpace.USER].userInfo;

export const getAuthStatus = (state) => state[ReducerNameSpace.USER].isAuthorized;

export const getIfAuthChecked = (state) => state[ReducerNameSpace.USER].isAuthChecked;
