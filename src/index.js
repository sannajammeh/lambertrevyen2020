import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
//Redux
import { Provider } from 'react-redux';
import { store } from './redux/store';
// LogRocket
import LogRocket from 'logrocket';
LogRocket.init('bdtmpv/lambertrevyen-2020');

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
