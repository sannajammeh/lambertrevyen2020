import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Ticket = ({ id, title = '', dateField = '', clock = '', match }) => {
  return (
    <div className="Ticket">
      <h4>{title}</h4>
      <h1 className="date">{dateField}</h1>
      <hr />
      <h2>{clock}</h2>
      <Link to={`${match.path}/${id}`} className="button inverted">
        Reserver
      </Link>
    </div>
  );
};

export default withRouter(Ticket);
