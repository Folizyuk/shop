import { all, call } from 'redux-saga/effects';
import propertiesSaga from './propertiesSaga';
import productsSaga from './productsSaga';
import filtersSaga from './filtersSaga';

function* rootSaga() {
  yield all([
    call(propertiesSaga),
    call(productsSaga),
    call(filtersSaga),
  ])
}

export default rootSaga;
