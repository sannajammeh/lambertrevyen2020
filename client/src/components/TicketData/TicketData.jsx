import React from 'react';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import spinner from '../Spinner/Spinner';
import { Title } from '../Title/Title';

const TicketData = ({ title, date, clock }) => {
  return (
    <div className="ticketData">
      <Title size="sm">{title}</Title>
      <span className="ticketItem">{date}</span>
      <div className="ticketDesc">
        <FaMapMarkerAlt /> Cecilie Thoresens vei 6, 1153 OSLO
      </div>
      <div className="ticketDesc">
        <FaClock /> {clock}
      </div>
    </div>
  );
};

export default spinner(TicketData);
