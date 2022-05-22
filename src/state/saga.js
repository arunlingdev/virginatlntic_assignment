import { all, put, select, take, takeEvery } from 'redux-saga/effects';
import {fetchHolidays } from '../api/endpoint';
import { actions } from '../state/reducer';

function* setHolidays(action) {
  try {
    const data = yield fetchHolidays(action.payload);
    if (!data.status || data.status === 200) {
      yield put(actions.setHolidays(data.data.holidays));
      yield put(actions.setLoader(0));
    }
  } catch (error) {
    yield put(actions.setLoader(0));
  }
}


function* watchAndLog() {
  while (true) {
    const action = yield take('*');
    const state = yield select();
    console.log('action', action);
    console.log('state after', state);
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery('GET_HOLIDAYS', setHolidays),
    watchAndLog(),
  ]);
}
