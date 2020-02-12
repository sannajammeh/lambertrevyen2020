import { createSelector } from 'reselect';

export const selectPlaysState = state => state.plays;

export const selectPlays = createSelector(selectPlaysState, plays => plays.plays);

export const selectPlaysFetching = createSelector(selectPlaysState, plays => plays.isFetching);
