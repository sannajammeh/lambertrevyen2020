import {
  BOOK_TICKET_START,
  BOOK_TICKET_SUCCESS,
  BOOK_TICKET_FAILURE
} from './tickets.types';

const initialState = {
  id: '',
  isFetching: false,
  error: false,
  errFields: {}
};

const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOOK_TICKET_START:
      return {
        ...state,
        isFetching: true
      };
    case BOOK_TICKET_SUCCESS:
      return {
        ...state,
        ticket: action.payload,
        isFetching: false
      };
    case BOOK_TICKET_FAILURE:
      const { message, fields } = action.payload;
      return {
        ...state,
        isFetching: false,
        error: message,
        errFields: fields || {}
      };
    default:
      return state;
  }
};

export default ticketReducer;
