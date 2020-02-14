import {
  BOOK_TICKET_START,
  BOOK_TICKET_SUCCESS,
  BOOK_TICKET_FAILURE,
  CLEAR_BOOKING_ERRORS,
} from './tickets.types';

export const bookTicketStart = () => ({
  type: BOOK_TICKET_START,
});

export const bookTicketSuccess = ticket => ({
  type: BOOK_TICKET_SUCCESS,
  payload: ticket,
});

export const bookTicketFailure = ({ errFields, message }) => ({
  type: BOOK_TICKET_FAILURE,
  payload: { errFields, message },
});

export const clearBookingErrors = () => ({
  type: CLEAR_BOOKING_ERRORS,
});
