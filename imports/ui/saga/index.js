import { all, call } from 'redux-saga/effects';
import tasksSaga from './tasksSaga';

function* rootSaga() {
  yield all([
    call(tasksSaga),
  ])
}

export default rootSaga;
