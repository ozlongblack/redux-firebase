import firebase from 'firebase/app';
import { metaTypes } from '../types';

const FIREBASE_LISTEN_REQUESTED = 'FIREBASE_LISTEN_REQUESTED';
const firebaseListenRequest = (ref, metaType) => ({
  type: FIREBASE_LISTEN_REQUESTED,
  payload: ref,
  meta: { type: metaType },
});

const FIREBASE_LISTEN_REJECTED = 'FIREBASE_LISTEN_REJECTED';
const firebaseListenRejected = (error, metaType) => ({
  type: FIREBASE_LISTEN_REJECTED,
  payload: { error },
  meta: { type: metaType },
});

const FIREBASE_LISTEN_FULFILLED = 'FIREBASE_LISTEN_FULFILLED';
const firebaseListenFulfilled = (items, metaType) => ({
  type: FIREBASE_LISTEN_FULFILLED,
  payload: { items },
  meta: { type: metaType },
});

const FIREBASE_LISTEN_CHILD_ADDED = 'FIREBASE_LISTEN_CHILD_ADDED';
const firebaseListenChildAdded = (id, value, metaType) => ({
  type: FIREBASE_LISTEN_CHILD_ADDED,
  payload: { id, value },
  meta: { type: metaType },
});

const FIREBASE_LISTEN_REMOVED = 'FIREBASE_LISTEN_REMOVED';
const firebaseListenRemoved = (clearItems, metaType) => ({
  type: FIREBASE_LISTEN_REMOVED,
  payload: { clearItems },
  meta: { type: metaType },
});

const FIREBASE_REMOVE_LISTENER_REQUESTED = 'FIREBASE_REMOVE_LISTENER_REQUESTED';
const firebaseRemoveListenerRequested = (clearItems, metaType) => ({
  type: FIREBASE_REMOVE_LISTENER_REQUESTED,
  payload: { clearItems },
  meta: { type: metaType },
});

export function listenToList() {
  console.log(firebase.database());
  const ref = firebase.database().ref('list');
  console.log(ref);
  return firebaseListenRequest(ref, metaTypes.list);
}

export default ({
  FIREBASE_LISTEN_REQUESTED,
  FIREBASE_LISTEN_REJECTED,
  FIREBASE_LISTEN_FULFILLED,
  FIREBASE_LISTEN_CHILD_ADDED,
  FIREBASE_LISTEN_REMOVED,
  FIREBASE_REMOVE_LISTENER_REQUESTED,
  firebaseListenRequest,
  firebaseListenRejected,
  firebaseListenFulfilled,
  firebaseListenChildAdded,
  firebaseListenRemoved,
  firebaseRemoveListenerRequested,
  listenToList,
})
