import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import createSagaMiddleware from 'redux-saga';
import firebase from '../firebase';
import reducers from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = composeWithDevTools({});
const initialState = {};
const store = createStore(
  reducers,
  initialState,
  composeEnhancers(
    firebase,
    applyMiddleware(sagaMiddleware),
  ),
);

sagaMiddleware.run(rootSaga, getFirebase);

export default store;
