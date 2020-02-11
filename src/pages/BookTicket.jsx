import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { Title } from '../components/Title/Title';
import { Input, IconInput } from '../components/Input/Input';
import { FaMailBulk, FaUser, FaPhone } from 'react-icons/fa';
import { PlaysContext } from '../context/plays';

const BookTicket = ({ match }) => {
  const { state } = React.useContext(PlaysContext);
  const { plays } = state;
  const { id } = match.params;

  const selectedPlay = plays[id];

  const { dateField } = selectedPlay || {};
  // Handle Form
  const initialState = {
    name: '',
    email: '',
    phone: ''
  };
  const [formData, setFormData] = React.useState(initialState);
  const { name, email, phone } = formData;

  // No URL param?
  if (Object.keys(plays).length && !selectedPlay) {
    return <Redirect to='/bestill' />;
  }
  const handleChange = e => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div className='container BookTicket'>
      <Title className='text-center' size='md'>
        {dateField}
      </Title>
      <form onSubmit={handleSubmit}>
        <IconInput
          type='text'
          name='name'
          icon={FaUser}
          placeholder='Navn'
          value={name}
          onChange={handleChange}
        />
        <IconInput
          type='email'
          name='email'
          icon={FaMailBulk}
          placeholder='Epost Addresse'
          value={email}
          onChange={handleChange}
        />
        <IconInput
          icon={FaPhone}
          type='number'
          name='phone'
          placeholder='Telefon'
          value={phone}
          onChange={handleChange}
        />
        <button className='button button-brand u-full-width' type='submit'>
          Reserver billett
        </button>
      </form>
    </div>
  );
};

export default withRouter(BookTicket);
