import React, { useMemo } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { IconInput } from '../components/Input/Input';
import { FaMailBulk, FaUser, FaPhone } from 'react-icons/fa';
import SelectPrice from '../components/Select/SelectPrice';
import TicketData from '../components/TicketData/TicketData';
import { formatToNOK } from '../utils/format';
// Error types
import {
  BAD_REQUEST,
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
  bookTicketFailure
} from '../redux/tickets/tickets.actions';
import {
  selectTicketLoading,
  selectTicketErr
} from '../redux/tickets/tickets.selectors';

const TicketDataMemo = React.memo(TicketData);
const IconInputMemo = React.memo(IconInput);

const BookTicket = ({ match, plays, isFetching, dispatch }) => {
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
    tickets: {},
    emailConfirmErr: '',
    nameErr: '',
    phoneErr: ''
  };

  const [formData, setFormData] = React.useState(initialState);

  const handleChange = e => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value, emailConfirmErr: '' });
  };

  const handleSelectChange = e => {
    const { value, name } = e.target;
    const { tickets } = formData;
    setFormData({ ...formData, tickets: { ...tickets, [name]: value } });
  };

  const {
    name,
    email,
    emailConfirm,
    emailConfirmErr,
    phone,
    tickets
  } = formData;

  const handleSubmit = async e => {
    e.preventDefault();

    if (email !== emailConfirm)
      return setFormData({
        ...formData,
        emailConfirmErr: 'Epost adresse er ikke lik'
      });

    const requestData = {
      name,
      email,
      phone,
      playId: selectedPlay.id,
      date: selectedPlay.dateField,
      tickets
    };
    const requestObj = {
      url: 'http://localhost:5000/api/tickets/',
      method: 'POST',
      data: requestData
    };

    try {
      dispatch(bookTicketStart());
      const response = await Axios(requestObj);
      console.log('TCL: BookTicket -> result', response);
      dispatch(bookTicketSuccess(response));
    } catch (err) {
      if (err.response.data) {
        const { data } = err.response;
        const { type } = data;

        switch (type) {
          case VALIDATION_ERROR:
            const { fields } = data;
            // Create normalized Data
            const errFields = {};
            fields.forEach(({ name, message }) => {
              errFields[name] = { name, message };
            });
            return dispatch(bookTicketFailure({ fields: errFields }));
          case PLAY_NOT_ENOUGH_SEATS:
            return dispatch(
              bookTicketFailure({ message: `Det er kun ${count} seter igjen.` })
            );
          default:
            return dispatch(
              bookTicketFailure({
                message: 'En feil oppstod under bestillingen'
              })
            );
        }
      }

      return dispatch(
        bookTicketFailure({
          message: 'En feil oppstod under bestillingen'
        })
      );
    }
  };

  const getTotal = useMemo(() => {
    return prices.reduce((acc, value) => {
      const amount = tickets[value.id] || 0;
      return acc + value.price * amount;
    }, 0);
  }, [prices, tickets]);

  // No URL param
  if (Object.keys(plays).length && !selectedPlay) {
    return <Redirect to='/bestill' />;
  }
  return (
    <div className='container BookTicket'>
      <form onSubmit={handleSubmit}>
        <TicketDataMemo
          isLoading={isFetching}
          inline
          title={title}
          date={dateField}
          clock={clock}
        />
        <IconInputMemo
          type='text'
          name='name'
          icon={FaUser}
          placeholder='Navn'
          value={name}
          onChange={handleChange}
          required
        />
        <IconInputMemo
          type='email'
          name='email'
          icon={FaMailBulk}
          placeholder='Epost addresse'
          value={email}
          onChange={handleChange}
          required
        />
        <IconInputMemo
          type='email'
          name='emailConfirm'
          invalid={emailConfirmErr}
          icon={FaMailBulk}
          placeholder='Bekreft epost addresse'
          value={emailConfirm}
          onChange={handleChange}
          required
        />
        <IconInputMemo
          icon={FaPhone}
          type='number'
          name='phone'
          placeholder='Telefon nummer'
          value={phone}
          onChange={handleChange}
          required
        />
        <hr className='break' />
        <div className='mb-3'>
          {prices.map(obj => (
            <SelectPrice
              label={`${obj.name} kr ${obj.price},-`}
              key={obj.id}
              name={obj.id}
              onChange={handleSelectChange}
              required={!getTotal}
            />
          ))}
          <h3 className='m-0'>Sum totalt: {formatToNOK(getTotal)}</h3>
        </div>
        <button className='button brand u-full-width' type='submit'>
          Reserver billett
        </button>
      </form>
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

// const mapDispatchToProps = {
//   bookTicketStart,
//   bookTicketSuccess,
//   bookTicketFailure
// };

export default withRouter(connect(mapStateToProps)(BookTicket));
