import { combineReducers } from 'redux';
import playsReducer from './plays/plays.reducers';
import ticketReducer from './tickets/tickets.reducers';

export const rootReducer = combineReducers({
  plays: playsReducer,
  tickets: ticketReducer
});
