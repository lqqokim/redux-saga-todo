import { all, fork } from 'redux-saga/effects';
import todoWatcher from './todos';

function* rootSaga() {
    yield all([fork(todoWatcher)])
}

export default rootSaga;