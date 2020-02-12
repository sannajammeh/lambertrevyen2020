import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import Header from './components/Header/Header';
import ShowTickets from './pages/ShowTickets';
import BookTicket from './pages/BookTicket';
import { convertSnapshot, normalizeData, firestore } from './firebase/firebase.utils';
//Redux
import { connect } from 'react-redux';
import { fetchPlaysSuccess, fetchPlaysStart, fetchPlaysFailure } from './redux/plays/plays.actions';

function App({ fetchPlaysStart, fetchPlaysSuccess, fetchPlaysFailure }) {
  useEffect(() => {
    fetchPlaysStart();

    const unsubscribe = firestore
      .collection('performances')
      .orderBy('date', 'asc')
      .onSnapshot(
        snapshot => {
          const { docs } = snapshot;

          const result = convertSnapshot(docs);

          fetchPlaysSuccess(normalizeData(result));
        },
        error => {
          fetchPlaysFailure(error.message);
        }
      );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/bestill" component={ShowTickets} />
        <Route path="/bestill/:id" component={BookTicket} />
      </Switch>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  fetchPlaysStart: () => dispatch(fetchPlaysStart),
  fetchPlaysSuccess: () => dispatch(fetchPlaysSuccess),
  fetchPlaysFailure: () => dispatch(fetchPlaysFailure),
});

export default connect(null, mapDispatchToProps)(App);

App.propTypes = {
  fetchPlaysStart: PropTypes.func.isRequired,
  fetchPlaysSuccess: PropTypes.func.isRequired,
  fetchPlaysFailure: PropTypes.func.isRequired,
};
