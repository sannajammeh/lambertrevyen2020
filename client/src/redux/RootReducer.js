import { combineReducers } from 'redux';
import { playsReducer } from './plays/plays.reducers';

export const rootReducer = combineReducers({
  plays: playsReducer,
});
