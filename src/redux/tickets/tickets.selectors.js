import { createSelector } from 'reselect';

const selectTicketsState = state => state.tickets;

export const selectTicket = createSelector(
  [selectTicketsState],
  tickets => tickets.ticket
);

export const selectTicketErr = createSelector(
  [selectTicketsState],
  ({ error, errFields }) => ({ error, errFields })
);

export const selectTicketLoading = createSelector(
  [selectTicketsState],
  tickets => tickets.isFetching
);
