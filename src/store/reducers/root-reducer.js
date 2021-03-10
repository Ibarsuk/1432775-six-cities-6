import {combineReducers} from "redux";
import dataReducer from './data/data';
import workProcessReducer from './work-process/work-process';
import userReducer from './user/user';

export const ReducerNameSpace = {
  DATA: `DATA`,
  WORK_PROCESS: `WORK_PROCESS`,
  USER: `USER`
};

export default combineReducers({
  [ReducerNameSpace.DATA]: dataReducer,
  [ReducerNameSpace.WORK_PROCESS]: workProcessReducer,
  [ReducerNameSpace.USER]: userReducer
});
