import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import Header from './components/Header/Header';
import ShowTickets from './pages/ShowTickets';
import BookTicket from './pages/BookTicket';

function App() {
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

export default App;
