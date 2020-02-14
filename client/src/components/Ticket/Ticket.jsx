import React from 'react';
import { withRouter } from 'react-router-dom';

const Ticket = ({ count, id, title = '', dateField = '', clock = '', match, history }) => {
  const maxSeats = 164;
  const isSoldOut = count >= maxSeats;
  return (
    <div className="Ticket">
      <h4>{title}</h4>
      <h1 className="date">{dateField}</h1>
      <hr />
      <h2>{clock}</h2>
      <div className="button-holder">
        <button
          onClick={() => history.push(`${match.path}/${id}`)}
          disabled={isSoldOut}
          className="button inverted"
        >
          {!isSoldOut ? 'Reserver' : 'Utsolgt'}
        </button>
      </div>
    </div>
  );
};

export default withRouter(Ticket);
