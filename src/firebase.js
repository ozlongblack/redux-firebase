import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { reactReduxFirebase } from 'react-redux-firebase';

const fbConfig = {
  apiKey: 'AIzaSyCjosHTX3AdP1JPaW9Qbs54HQEEPCRdE4g',
  authDomain: 'redux-saga-channel.firebaseapp.com',
  databaseURL: 'https://redux-saga-channel.firebaseio.com',
  projectId: 'redux-saga-channel',
  storageBucket: 'redux-saga-channel.appspot.com',
  messagingSenderId: '364477370780',
};

const rrfConfig = {
  userProfile: 'users',
};

firebase.initializeApp(fbConfig);

export default reactReduxFirebase(firebase, rrfConfig);
