import {
  BOOK_TICKET_START,
  BOOK_TICKET_SUCCESS,
  BOOK_TICKET_FAILURE
} from './tickets.types';

export const bookTicketStart = () => ({
  type: BOOK_TICKET_START
});

export const bookTicketSuccess = ticket => ({
  type: BOOK_TICKET_SUCCESS,
  payload: ticket
});

export const bookTicketFailure = ({ fields, message }) => ({
  type: BOOK_TICKET_FAILURE,
  payload: { fields, message }
});
