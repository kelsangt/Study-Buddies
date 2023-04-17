import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/store';
import * as eventActions from './store/events';
import * as locationActions from './store/locations';

let store = configureStore({});

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.eventActions = eventActions;
  window.locationActions = locationActions;
}
function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
				<App />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);