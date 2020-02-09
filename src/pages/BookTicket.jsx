import React from 'react';
import { withRouter } from 'react-router-dom';
import { Title } from '../components/Title/Title';
import { Input, IconInput } from '../components/Input/Input';
import { FaMailBulk } from 'react-icons/fa';

const BookTicket = ({ match }) => {
  console.log(match);
  return (
    <div className="container">
      <Title size="md">20 Feb </Title>
      <IconInput icon={FaMailBulk} placeholder="Epost Addresse" />
      <Input placeholder="Navn" />
      <Input placeholder="Navn" />
      <Input placeholder="Navn" />
      <Input placeholder="Navn" />
    </div>
  );
};

export default withRouter(BookTicket);
