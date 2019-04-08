import { take,put } from 'redux-saga/effects';
import axios from 'axios';


import * as mutations from './mutations';


export function* updateLiveMatchSaga() {
    while (true) {
        yield put(mutations.updateLiveMatch());
    }
}