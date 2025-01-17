import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import { convertSnapshot, normalizeData, firestore } from './firebase/firebase.utils';
//Redux
import { connect } from 'react-redux';
import { fetchPlaysSuccess, fetchPlaysStart, fetchPlaysFailure } from './redux/plays/plays.actions';
// Components
import Header from './components/Header/Header';

// Page Components
import HomePage from './pages/HomePage';
import SuccessPage from './pages/SuccessPage';
import BookTicket from './pages/BookTicket';
import ShowTickets from './pages/ShowTickets';

class App extends Component {
  unsubscribe = undefined;
  componentDidMount() {
    const { fetchPlaysStart, fetchPlaysSuccess, fetchPlaysFailure } = this.props;
    fetchPlaysStart();

    this.unsubscribe = firestore
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
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/bestill" component={ShowTickets} />
          <Route path="/bestill/:id" component={BookTicket} />
          <Route path="/success" component={SuccessPage} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchPlaysStart: () => dispatch(fetchPlaysStart()),
  fetchPlaysSuccess: data => dispatch(fetchPlaysSuccess(data)),
  fetchPlaysFailure: err => dispatch(fetchPlaysFailure(err)),
});

export default connect(null, mapDispatchToProps)(App);

App.propTypes = {
  fetchPlaysStart: PropTypes.func.isRequired,
  fetchPlaysSuccess: PropTypes.func.isRequired,
  fetchPlaysFailure: PropTypes.func.isRequired,
};
