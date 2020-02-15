import React from 'react';
import { FaMapMarkerAlt, FaClock, FaChair } from 'react-icons/fa';
import spinner from '../Spinner/Spinner';
import { Title } from '../Title/Title';

const TicketData = ({ seats, title, date, clock }) => {
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
      <div className="ticketDesc">
        <FaChair /> Tilgjengelige seter: {seats}
      </div>
    </div>
  );
};

export default spinner(TicketData);
