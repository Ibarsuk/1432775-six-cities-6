import {ReducerNameSpace} from '../root-reducer';

export const getActiveCity = (state) => state[ReducerNameSpace.WORK_PROCESS].activeCity;

export const getActiveOfferId = (state) => state[ReducerNameSpace.WORK_PROCESS].activeOfferId;
