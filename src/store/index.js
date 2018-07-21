import { createStore, applyMiddleware, compose } from 'redux';
import immutable from 'immutable';
import { DEVELOPMENT_MODE } from '~/constants';
import reducer from './reducer';

function configureStore(initialState = {}) {
  let composeEnhancers = compose;
  const middlewares = [];

  if (NODE_ENV === DEVELOPMENT_MODE) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        serialize: { immutable },
      })
      : compose;
  }

  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  return store;
}

export default configureStore;
