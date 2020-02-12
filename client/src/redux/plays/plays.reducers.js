import { FETCH_PLAYS_START, FETCH_PLAYS_SUCCESS, FETCH_PLAYS_FAILURE } from './plays.types';

const initialState = {
  plays: {},
  isFetching: false,
  error: undefined,
};

export const playsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLAYS_START:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_PLAYS_SUCCESS:
      return {
        ...state,
        plays: action.payload,
        isFetching: false,
      };
    case FETCH_PLAYS_FAILURE:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      };
    default:
      return state;
  }
};
