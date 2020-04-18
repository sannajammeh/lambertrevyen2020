import React from 'react';
import { withRouter } from 'react-router-dom';

const Ticket = ({ count, id, title = '', dateField = '', clock = '', match, history, expired }) => {
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
          disabled={expired}
          className="button inverted"
        >
          {!isSoldOut && !expired ? 'Reserver' : 'Utsolgt'}
        </button>
      </div>
    </div>
  );
};

export default withRouter(Ticket);
