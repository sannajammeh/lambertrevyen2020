import { createContext } from 'react';

export const FETCH_PLAYS_START = 'FETCH_PLAYS_START';
export const FETCH_PLAYS_SUCCESS = 'FETCH_PLAYS_SUCCESS';
export const FETCH_PRICES_SUCCESS = 'FETCH_PRICES_SUCCESS';
export const FETCH_PLAYS_FAILURE = 'FETCH_PLAYS_FAILURE';

export const initialState = {
  plays: {},
  isFetching: false,
  error: undefined,
};

export const fetchPlaysStart = () => ({
  type: FETCH_PLAYS_START,
});
export const fetchPlaysSuccess = payload => ({
  type: FETCH_PLAYS_SUCCESS,
  payload,
});
export const fetchPricesSuccess = payload => ({
  type: FETCH_PRICES_SUCCESS,
  payload,
});
export const fetchPlaysFailure = errorMessage => ({
  type: FETCH_PLAYS_FAILURE,
  payload: errorMessage,
});

export const playsReducer = (state, action) => {
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

export const PlaysContext = createContext({});
