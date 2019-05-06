import {
  call,
  fork,
  take,
} from 'redux-saga/effects';
import firebase from 'firebase/app';
import { list } from '../../actions';

const database = firebase.database();
const ref = database.ref('list');

function* updateItems(item) {
    const id = item.id;
    yield call([ref, ref.update], {
      [id]: item,
    });
}

export default function* updateList() {
  while(true) {
    const action = yield take(list.UPDATE);
    yield fork(updateItems, action.payload);
  }
}
