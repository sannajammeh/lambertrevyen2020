import React from 'react';
import PropTypes from 'prop-types';
import { Title } from '../components/Title/Title';
import Ticket from '../components/Ticket/Ticket';

const ShowTicket = props => {
  return (
    <div className="container ShowTicket">
      <Title className="text-center">Billetter</Title>
      <div className="grid mx-auto ml-1">
        <Ticket />
        <Ticket />
        <Ticket />
      </div>
    </div>
  );
};

ShowTicket.propTypes = {};

export default ShowTicket;
