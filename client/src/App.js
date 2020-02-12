import React, { useMemo, useReducer, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import Header from './components/Header/Header';
import ShowTickets from './pages/ShowTickets';
import BookTicket from './pages/BookTicket';
import { fetchPerformances, normalizeData } from './firebase/firebase.utils';
// GState
import {
  PlaysContext,
  playsReducer,
  initialState,
  fetchPlaysStart,
  fetchPlaysSuccess,
  fetchPlaysFailure,
} from './context/plays';

function App() {
  //Store Setup
  const [state, dispatch] = useReducer(playsReducer, initialState);
  const store = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  useEffect(() => {
    const asyncFetchPlays = async () => {
      try {
        dispatch(fetchPlaysStart());

        const result = await fetchPerformances();

        dispatch(fetchPlaysSuccess(normalizeData(result)));
      } catch (err) {
        dispatch(fetchPlaysFailure(err.message));
      }
    };

    asyncFetchPlays();
  }, []);

  return (
    <div>
      <PlaysContext.Provider value={store}>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/bestill" component={ShowTickets} />
          <Route path="/bestill/:id" component={BookTicket} />
        </Switch>
      </PlaysContext.Provider>
    </div>
  );
}

export default App;
