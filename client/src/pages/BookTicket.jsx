import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { IconInput } from '../components/Input/Input';
import { FaMailBulk, FaUser, FaPhone } from 'react-icons/fa';
import { PlaysContext } from '../context/plays';
import SelectPrice from '../components/Select/SelectPrice';
import TicketData from '../components/TicketData/TicketData';
import { formatToNOK } from '../utils/format';

const BookTicket = ({ match }) => {
  const { state } = React.useContext(PlaysContext);
  const { plays, isFetching } = state;
  const { id } = match.params;

  const selectedPlay = plays[id];

  // Get Play data
  const { dateField, title, clock, prices = [] } = selectedPlay || {};

  // Handle Form
  const initialState = {
    name: '',
    email: '',
    phone: '',
    price: '',
    tickets: {},
  };

  const [formData, setFormData] = React.useState(initialState);

  // No URL param
  if (Object.keys(plays).length && !selectedPlay) {
    return <Redirect to="/bestill" />;
  }

  const handleChange = e => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = e => {
    const { value, name } = e.target;
    const { tickets } = formData;
    setFormData({ ...formData, tickets: { ...tickets, [name]: value } });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(formData);
  };

  const { name, email, phone, price, tickets } = formData;

  const getTotal = () => {
    return prices.reduce((acc, value) => {
      const amount = tickets[value.id] || 0;
      return acc + value.price * amount;
    }, 0);
  };

  return (
    <div className="container BookTicket">
      <form onSubmit={handleSubmit}>
        <TicketData isLoading={isFetching} inline title={title} date={dateField} clock={clock} />
        <IconInput
          type="text"
          name="name"
          icon={FaUser}
          placeholder="Navn"
          value={name}
          onChange={handleChange}
          required
        />
        <IconInput
          type="email"
          name="email"
          icon={FaMailBulk}
          placeholder="Epost Addresse"
          value={email}
          onChange={handleChange}
          required
        />
        <IconInput
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
              required={!getTotal()}
            />
          ))}
          <h3 className="m-0">Sum totalt: {formatToNOK(getTotal())}</h3>
        </div>
        <button className="button brand u-full-width" type="submit">
          Reserver billett
        </button>
      </form>
    </div>
  );
};

export default withRouter(BookTicket);