import React, { useMemo } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { IconInput } from '../components/Input/Input';
import { FaMailBulk, FaUser, FaPhone } from 'react-icons/fa';
import SelectPrice from '../components/Select/SelectPrice';
import TicketData from '../components/TicketData/TicketData';
import { formatToNOK } from '../utils/format';
// Redux
import { createStructuredSelector } from 'reselect';
import { selectPlays, selectPlaysFetching } from '../redux/plays/plays.selectors';
import { connect } from 'react-redux';

const TicketDataMemo = React.memo(TicketData);
const IconInputMemo = React.memo(IconInput);

const BookTicket = ({ match, plays, isFetching }) => {
  const { id } = match.params;

  const selectedPlay = plays[id];

  // Get Play data
  const { dateField, title, clock, prices = [] } = selectedPlay || {};

  // Handle Form
  const initialState = {
    name: '',
    email: '',
    emailConfirm: '',
    phone: '',
    price: '',
    tickets: {},
    emailConfirmErr: '',
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

  const { name, email, emailConfirm, emailConfirmErr, phone, tickets } = formData;

  const handleSubmit = async e => {
    e.preventDefault();

    if (email !== emailConfirm)
      return setFormData({ ...formData, emailConfirmErr: 'Epost adresse er ikke lik' });

    const requestData = {
      name,
      email,
      phone,
      playId: selectedPlay.id,
      date: selectedPlay.dateField,
      tickets,
    };
    const requestObj = {
      url: 'http://localhost:5000/api/tickets/',
      method: 'POST',
      data: requestData,
    };

    try {
      const result = await Axios(requestObj);
      console.log('TCL: BookTicket -> result', result);
    } catch (err) {
      console.error(err.message);
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
    return <Redirect to="/bestill" />;
  }
  return (
    <div className="container BookTicket">
      <form onSubmit={handleSubmit}>
        <TicketDataMemo
          isLoading={isFetching}
          inline
          title={title}
          date={dateField}
          clock={clock}
        />
        <IconInputMemo
          type="text"
          name="name"
          icon={FaUser}
          placeholder="Navn"
          value={name}
          onChange={handleChange}
          required
        />
        <IconInputMemo
          type="email"
          name="email"
          icon={FaMailBulk}
          placeholder="Epost addresse"
          value={email}
          onChange={handleChange}
          required
        />
        <IconInputMemo
          type="email"
          name="emailConfirm"
          invalid={emailConfirmErr}
          icon={FaMailBulk}
          placeholder="Bekreft epost addresse"
          value={emailConfirm}
          onChange={handleChange}
          required
        />
        <IconInputMemo
          icon={FaPhone}
          type="number"
          name="phone"
          placeholder="Telefon nummer"
          value={phone}
          onChange={handleChange}
          required
        />
        <hr className="break" />
        <div className="mb-3">
          {prices.map(obj => (
            <SelectPrice
              label={`${obj.name} kr ${obj.price},-`}
              key={obj.id}
              name={obj.id}
              onChange={handleSelectChange}
              required={!getTotal}
            />
          ))}
          <h3 className="m-0">Sum totalt: {formatToNOK(getTotal)}</h3>
        </div>
        <button className="button brand u-full-width" type="submit">
          Reserver billett
        </button>
      </form>
    </div>
  );
};

BookTicket.propTypes = {
  match: PropTypes.object.isRequired,
  plays: PropTypes.object.isRequired,
  isFetching: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  plays: selectPlays,
  isFetching: selectPlaysFetching,
});

export default withRouter(connect(mapStateToProps)(BookTicket));
