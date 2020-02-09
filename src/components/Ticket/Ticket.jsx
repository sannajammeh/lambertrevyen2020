import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

const Ticket = ({ match }) => {
  return (
    <div className="Ticket">
      <h4>Første forestilling</h4>
      <h1 className="date">20. februar</h1>
      <hr />
      <h2>kl 19.00</h2>
      <Link to={`${match.path}/3433`} className="button inverted">
        Reserver
      </Link>
    </div>
  );
};

Ticket.propTypes = {};

export default withRouter(Ticket);
