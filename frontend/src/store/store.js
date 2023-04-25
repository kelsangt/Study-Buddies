import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import errors from './errors';
import sessionReducer from './session';
import eventsReducer from './events';
import locationReducer from './locations';
import uiReducer from './ui';

const rootReducer = combineReducers({
  session: sessionReducer,
  events: eventsReducer,
  locations: locationReducer,
  ui: uiReducer,
  errors
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;