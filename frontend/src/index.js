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
import { ModalProvider } from './context/Modal';

let store = configureStore({});

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.eventActions = eventActions;
  window.locationActions = locationActions;
}
function Root() {
  return (
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ModalProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);