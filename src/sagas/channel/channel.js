import { eventChannel, END } from 'redux-saga';
import { call, take } from 'redux-saga/effects';

function countdown(seconds) {
  return eventChannel(emit => {
    console.log(seconds);
    const iv = setInterval(() => {
      seconds -= 1;
      if (seconds > 0) {
        emit(seconds);
      } else {
        emit(END)
      }
    }, 1000);

    return () => {
      clearInterval(iv);
    }
  })
}

export function* channel() {
  console.log('channel');
  const chan = yield call(countdown, 10);
  try {
    while (true) {
      let seconds = yield take(chan);
      console.log('countdown', seconds);

    }
  } finally {
    console.log('countdown terminated');
  }
}
