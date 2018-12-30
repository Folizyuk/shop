import { all, call } from 'redux-saga/effects';
import propertyGroupsSaga from './propertyGroupsSaga';
import propertiesSaga from './propertiesSaga';
import productsSaga from './productsSaga';

function* rootSaga() {
  yield all([
    call(propertyGroupsSaga),
    call(propertiesSaga),
    call(productsSaga),
  ])
}

export default rootSaga;
