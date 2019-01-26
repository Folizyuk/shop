import { all, call } from 'redux-saga/effects';
import propertiesSaga from './propertiesSaga';
import productsSaga from './productsSaga';
import filtersSaga from './filtersSaga';
import usersSaga from './usersSaga';

function* rootSaga() {
  yield all([
    call(propertiesSaga),
    call(productsSaga),
    call(filtersSaga),
    call(usersSaga),
  ])
}

export default rootSaga;
