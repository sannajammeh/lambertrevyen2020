import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { Title } from '../components/Title/Title';
import { Input, IconInput } from '../components/Input/Input';
import { FaMailBulk } from 'react-icons/fa';
import { PlaysContext } from '../context/plays';

const BookTicket = ({ match }) => {
  const { state } = React.useContext(PlaysContext);
  const { plays } = state;
  const { id } = match.params;

  const selectedPlay = plays[id];

  if (Object.keys(plays).length && !selectedPlay) {
    return <Redirect to="/bestill" />;
  }
  const { dateField } = selectedPlay;
  return (
    <div className="container">
      <Title size="md">{dateField} </Title>
      <IconInput icon={FaMailBulk} placeholder="Epost Addresse" />
      <Input placeholder="Navn" />
      <Input placeholder="Navn" />
      <Input placeholder="Navn" />
      <Input placeholder="Navn" />
    </div>
  );
};

export default withRouter(BookTicket);
