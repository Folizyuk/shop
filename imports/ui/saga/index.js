import { all, call } from 'redux-saga/effects';
import propertyGroupsSaga from './propertyGroupsSaga';
import propertiesSaga from './propertiesSaga';

function* rootSaga() {
  yield all([
    call(propertyGroupsSaga),
    call(propertiesSaga),
  ])
}

export default rootSaga;
