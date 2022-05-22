import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import App from "../containers/App"
import rootReducer from '../state';
import rootSaga from '../state/saga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
   rootReducer,
   applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

const Virgin = () => {
  return (
    <Provider store={store}>
       <App />
    </Provider>
  );  
}

export default Virgin