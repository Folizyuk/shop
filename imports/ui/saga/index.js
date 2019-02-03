import { all, call } from 'redux-saga/effects';
import productsSaga from './productsSaga';
import usersSaga from './usersSaga';
import cartSaga from './cartSaga';
import ordersSaga from './ordersSaga';

function* rootSaga() {
  yield all([
    call(productsSaga),
    call(usersSaga),
    call(cartSaga),
    call(ordersSaga),
  ])
}

export default rootSaga;
