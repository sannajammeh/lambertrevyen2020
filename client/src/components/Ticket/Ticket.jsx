import React from 'react';
import { withRouter } from 'react-router-dom';

const Ticket = ({ id, title = '', dateField = '', clock = '', match, history }) => {
  return (
    <div className="Ticket">
      <h4>{title}</h4>
      <h1 className="date">{dateField}</h1>
      <hr />
      <h2>{clock}</h2>
      <div className="button-holder">
        <button onClick={() => history.push(`${match.path}/${id}`)} className="button inverted">
          Reserver
        </button>
      </div>
    </div>
  );
};

export default withRouter(Ticket);
