import {
  BOOK_TICKET_START,
  BOOK_TICKET_SUCCESS,
  BOOK_TICKET_FAILURE,
  CLEAR_BOOKING_ERRORS,
} from './tickets.types';

const initialState = {
  id: '',
  isFetching: false,
  ticket: {},
  error: false,
  errFields: {},
};

const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOOK_TICKET_START:
      return {
        ...state,
        isFetching: true,
      };
    case BOOK_TICKET_SUCCESS:
      return {
        ...state,
        ticket: action.payload,
        isFetching: false,
      };
    case BOOK_TICKET_FAILURE:
      const { message, errFields = {} } = action.payload;
      return {
        ...state,
        isFetching: false,
        error: message,
        errFields: errFields,
      };
    case CLEAR_BOOKING_ERRORS:
      return {
        ...state,
        error: false,
        errFields: {},
      };
    default:
      return state;
  }
};

export default ticketReducer;
