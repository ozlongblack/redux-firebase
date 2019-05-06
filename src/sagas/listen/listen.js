import { eventChannel, buffers } from 'redux-saga'
import {
  call,
  cancel,
  flush,
  fork,
  put,
  take,
} from 'redux-saga/effects';
import {
  event as eventActions,
  listen as listenActions,
} from '../../actions';

export function* watchListener(metaType) {
  while(true) {
    const listenRequestAction = yield take(
      listenActions.FIREBASE_LISTEN_REQUESTED,
    );

    console.log(listenRequestAction);
    console.log(metaType);

    if (listenRequestAction.meta.type === metaType) {
      let task = yield fork(
        getDataAndListenToChannel,
        listenRequestAction.payload.ref,
        metaType,
      );

      console.log('saga, task', task);

      while(true) {
        const action = yield take([
          listenActions.FIREBASE_REMOVE_LISTENER_REQUESTED,
          listenActions.FIREBASE_LISTEN_REQUESTED,
        ]);

        console.log('saga, action', action)

        if (action.meta.type === metaType) {
          yield cancel(task);
          yield put(listenActions.firebaseListenRemoved(!!action.payload.clearItems, metaType));

          if(action.type === listenActions.FIREBASE_LISTEN_REQUESTED) {
            task = yield fork(
              getDataAndListenToChannel,
              action.payload.ref,
              metaType,
            );
          } else {
            break;
          }
        }
      }
    }
  }
}

export function createEventChannel(ref) {
  return eventChannel(emit => {
    ref.on('child_added', snap => {
      emit({
        eventType: eventActions.CHILD_ADDED,
        key: snap.key,
        value: snap.val(),
      })
    });

    return () => {
      ref.off();
    }
  }, buffers.expanding(1));
}

export function* getDataAndListenToChannel(ref, metaType) {
  const chan = yield call(createEventChannel, ref);

  try {
    try {
      const snap = yield call([ref, ref.once], 'value');
      yield flush(chan);
      const val = snap.val();
      const value = val ? val : {};
      console.log(snap, val, value);
      yield put(listenActions.firebaseListenFulfilled(value, metaType));
    } catch (error) {
      yield put(listenActions.firebaseListenRejected(error, metaType));
    }
    while(true) {
      const data = yield take(chan);
      yield put(listenActions.firebaseListenChildAdded(data.key, data.value, metaType));
    }
  } finally {
    chan.close();
  }
}
