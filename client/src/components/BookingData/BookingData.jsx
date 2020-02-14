import React, { useState, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import {
  FaInfoCircle,
  FaSyncAlt,
  FaClipboard,
  FaPrint,
  FaCalendarDay,
  FaClock,
  FaMapMarkerAlt,
} from 'react-icons/fa';
//Redux
import { createStructuredSelector } from 'reselect';
import { selectTicket } from '../../redux/tickets/tickets.selectors';
import { connect } from 'react-redux';
import { selectPlays } from '../../redux/plays/plays.selectors';
import { calcTotalTicketPrice } from '../../utils/calculations';
import spinner from '../Spinner/Spinner';
import { formatToNOK } from '../../utils/format';
// Copy
import CopyToClipBoard from 'react-copy-to-clipboard';
import ReactToPrint from 'react-to-print';

const BookingData = ({ ticket, plays }) => {
  const PrintRef = useRef();
  const [copy, setCopy] = useState(false);

  const { id, playId, name, email, seats } = ticket;

  const play = plays[playId];
  if (!play) return <Redirect to="/" />;
  const { dateField, clock } = play;

  const totalSeats = Object.values(seats).reduce((acc, value) => acc + Number(value), 0);
  const sumTotal = formatToNOK(calcTotalTicketPrice(seats, play.prices));

  const onCopy = () => {
    setCopy(true);
    setTimeout(() => setCopy(false), 1000);
  };
  return (
    <div className="bookingData" ref={PrintRef}>
      <div className="row">
        <div className="bookingData_infoSection">
          <h2 className="title">
            <FaInfoCircle /> Info
          </h2>
          <div className="bookingData_item">
            <FaCalendarDay /> {dateField} <FaClock /> {clock}
          </div>
          <div className="bookingData_item">
            <FaMapMarkerAlt /> Cecilie Thoresens vei 6, 1153 OSLO
          </div>
          <div className="bookingData_item">
            <b>Billettkode:</b> {id}
          </div>
          <div className="bookingData_item">
            <b>Navn:</b> {name}
          </div>
          <div className="bookingData_item">
            <b>Epost:</b> {email}
          </div>

          <div className="bookingData_item">
            <b>Plasser reservert:</b> {totalSeats}
          </div>
          <div className="bookingData_item">
            <b>Sum: {sumTotal}</b>
          </div>
        </div>

        <div className="bookingData_payment">
          <FaSyncAlt /> <b>Status</b>: Reservert
          <p className="bookingData_info">
            Betaling gjøres gjennom vipps ved luka på forestillingen. Beløp kan også
            forhåndsbetales. Betale på forhånd:
          </p>
          <div className="bookingData_item">VIPPS {sumTotal.toUpperCase()} TIL</div>
          <div className="bookingData_payment_info">
            <input type="text" className="input" value="+47 45513326" readOnly />
            <div visible={copy.toString()} className="toolTip">
              Kopiert
            </div>
            <CopyToClipBoard onCopy={() => onCopy()} text="+47 45513326">
              <button className="copy">
                <FaClipboard />
              </button>
            </CopyToClipBoard>
          </div>
        </div>

        <div className="print no-print">
          <ReactToPrint
            trigger={() => (
              <button className="button accent">
                <FaPrint /> Skriv ut
              </button>
            )}
            content={() => PrintRef.current}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  ticket: selectTicket,
  plays: selectPlays,
});
export default connect(mapStateToProps)(spinner(BookingData));
