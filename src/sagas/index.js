import {
  all,
  fork,
} from 'redux-saga/effects';
import { channel } from './channel/channel';
import { watchListener } from './listen/listen';
import { metaTypes } from '../types';
import listSaga from './list/list';
import updateList from './list/update';

export default function* rootSaga() {
  yield all([
    fork(listSaga),
    fork(updateList),
    // fork(channel),
    // watchListener(metaTypes.list),
  ]);
}
