import { all, call } from 'redux-saga/effects';
import propertyGroupsSaga from './propertyGroupsSaga';

function* rootSaga() {
  yield all([
    call(propertyGroupsSaga),
  ])
}

export default rootSaga;
