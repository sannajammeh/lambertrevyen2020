import React, { useEffect } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import TicketData from '../components/TicketData/TicketData';
// Error types
import {
  PLAY_IS_BOOKED,
  PLAY_NOT_ENOUGH_SEATS,
  VALIDATION_ERROR
} from '../utils/error.types';
// Redux
import { createStructuredSelector } from 'reselect';
import {
  selectPlays,
  selectPlaysFetching
} from '../redux/plays/plays.selectors';
import { connect } from 'react-redux';
import {
  bookTicketStart,
  bookTicketSuccess,
  bookTicketFailure,
  clearBookingErrors
} from '../redux/tickets/tickets.actions';
import {
  selectTicketLoading,
  selectTicketErr
} from '../redux/tickets/tickets.selectors';
import BookingForm from '../components/BookingForm/BookingForm';
import spinner from '../components/Spinner/Spinner';

const SpinnerBookingForm = spinner(BookingForm);
const PlayDataMemo = React.memo(TicketData);

const maxSeats = 164;

const BookTicket = ({
  bookTicketStart,
  bookTicketSuccess,
  bookTicketFailure,
  clearBookingErrors,
  match,
  plays,
  isFetching,
  isTicketFetching,
  formErrors,
  history
}) => {
  const { id } = match.params;

  // Get Play data
  const selectedPlay = plays[id];
  const { dateField, title, clock, prices = [], count } = selectedPlay || {};

  // Handle Form
  const initialState = {
    name: '',
    email: '',
    emailConfirm: '',
    phone: '',
    price: '',
    seats: {},
    ...formErrors
  };
  const noErrState = {
    errFields: {},
    error: false
  };

  const [formData, setFormData] = React.useState(initialState);

  useEffect(() => {
    if (formErrors.error) {
      setFormData(prevState => ({ ...prevState, ...formErrors }));
      return () => {
        clearBookingErrors();
      };
    }
  }, [formErrors, clearBookingErrors]);

  const handleChange = e => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value, ...noErrState });
  };

  const handleSelectChange = e => {
    const { value, name } = e.target;
    const { seats } = formData;
    setFormData({
      ...formData,
      seats: { ...seats, [name]: value },
      ...noErrState
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const { name, email, emailConfirm, phone, seats, errFields } = formData;

    if (email !== emailConfirm)
      return setFormData({
        ...formData,
        errFields: { ...errFields, email: 'Epost er ikke lik' }
      });

    const requestData = {
      name,
      email,
      phone,
      playId: selectedPlay.id,
      date: selectedPlay.dateField,
      seats
    };
    const requestObj = {
      url: 'https://api.lambertrevyen2020.no/v1/tickets',
      method: 'POST',
      data: requestData
    };

    try {
      bookTicketStart();

      const response = await Axios(requestObj);

      bookTicketSuccess(response.data);

      history.push('/success');
    } catch (err) {
      if (err.response?.data) {
        const { data } = err.response;
        const { type } = data;

        setFormData(prevState => ({ ...prevState, seats: {} }));
        switch (type) {
          case VALIDATION_ERROR:
            const { fields } = data;
            // Create normalized Data from errFields
            const errFields = {};
            fields.forEach(({ name }) => {
              errFields[name] = true;
            });
            return bookTicketFailure({
              errFields,
              message: 'Reservasjon avvist, sjekk felter.'
            });

          case PLAY_NOT_ENOUGH_SEATS:
            return bookTicketFailure({
              message: `Det er kun ${maxSeats - Number(count)} ${
                Number(count) > 1 ? 'sete' : 'seter'
              } igjen.`
            });

          case PLAY_IS_BOOKED:
            return bookTicketFailure({ message: 'Forestilling er utsolgt.' });

          default:
            return bookTicketFailure({
              message: 'En feil oppstod under bestillingen'
            });
        }
      }
      // Undefined Error
      return bookTicketFailure({
        message: 'En feil oppstod under bestillingen'
      });
    }
  };

  // No URL param
  if (Object.keys(plays).length && !selectedPlay) {
    return <Redirect to='/bestill' />;
  }

  return (
    <div className='container BookTicket'>
      <PlayDataMemo
        seats={maxSeats - count}
        isLoading={isFetching}
        inline
        title={title}
        date={dateField}
        clock={clock}
      />
      <SpinnerBookingForm
        isLoading={isTicketFetching}
        {...{
          handleChange,
          handleSelectChange,
          handleSubmit,
          prices,
          formData,
          count,
          maxSeats
        }}
      />
    </div>
  );
};

BookTicket.propTypes = {
  match: PropTypes.object.isRequired,
  plays: PropTypes.object.isRequired,
  isFetching: PropTypes.bool
};

const mapStateToProps = createStructuredSelector({
  plays: selectPlays,
  isFetching: selectPlaysFetching,
  formErrors: selectTicketErr,
  isTicketFetching: selectTicketLoading
});

const actions = {
  bookTicketStart,
  bookTicketSuccess,
  bookTicketFailure,
  clearBookingErrors
};

export default withRouter(connect(mapStateToProps, actions)(BookTicket));
