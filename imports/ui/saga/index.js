import { all, call } from 'redux-saga/effects';
import productsSaga from './productsSaga';
import usersSaga from './usersSaga';

function* rootSaga() {
  yield all([
    call(productsSaga),
    call(usersSaga),
  ])
}

export default rootSaga;
