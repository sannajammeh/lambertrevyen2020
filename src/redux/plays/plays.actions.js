import {
  FETCH_PLAYS_START,
  FETCH_PLAYS_SUCCESS,
  FETCH_PLAYS_FAILURE
} from './plays.types';

export const fetchPlaysStart = () => ({
  type: FETCH_PLAYS_START
});
export const fetchPlaysSuccess = payload => ({
  type: FETCH_PLAYS_SUCCESS,
  payload
});
export const fetchPlaysFailure = errorMessage => ({
  type: FETCH_PLAYS_FAILURE,
  payload: errorMessage
});
