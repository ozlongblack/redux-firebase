import { put, take, call } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import firebase from 'firebase/app';
import { list } from '../../actions';

const database = firebase.database();
const ref = database.ref('list');

function createEventChannel() {
  const listener = eventChannel(
    emit => {
      ref
        .on('child_added', data => {
          return emit(data.val());
        });

      ref
        .on('child_changed', data => {
          return emit(data.val());
        });

      ref
        .on('child_moved', data => {
          return emit(data.val());
        });

      ref
        .on('child_removed', data => {
          return emit(data.val());
        });

      return () => {
        return ref.off();
      };
    },
  );

  return listener;
}

export default function* listSaga() {
  const channel = createEventChannel();

  try{
    try {
      yield take(list.LISTEN);
      const snap = yield call([ref, ref.once], 'value');
      yield put(list.set(snap.val() || {}));

      while (true) {
        const item = yield take(channel);
        yield put(list.updated(item));
      }
    } catch (error) {
      yield put(list.error(error));
    }
  } finally {
    channel.close();
  }
}
