import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import list from './list/list';

export default combineReducers({
  firebase: firebaseReducer,
  list,
})
