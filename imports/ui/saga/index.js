import { all, call } from 'redux-saga/effects';
import productsSaga from './productsSaga';
import usersSaga from './usersSaga';
import cartSaga from './cartSaga';

function* rootSaga() {
  yield all([
    call(productsSaga),
    call(usersSaga),
    call(cartSaga),
  ])
}

export default rootSaga;
