import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from 'redux-saga';
import * as sagas from './sagas';
import * as mutations from './mutations';
const sagaMiddleware = createSagaMiddleware();


export const store = createStore(
    combineReducers({
        live_match(live_match=[], action) {
            switch(action.type) {
                case mutations.UPDATE_LIVE_MATCH:
                    return action.state.live_match;
                default:
                    return live_match;
            }
        }
    }),
    applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas) {
    sagaMiddleware.run(sagas[saga]);
}