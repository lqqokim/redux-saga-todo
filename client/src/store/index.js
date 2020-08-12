import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import reducer from "../_reducers";
import rootSaga from "../sagas";
import { composeWithDevTools } from "redux-devtools-extension";

// saga를 store에 연결하기위한 Middleware 사용
const sagaMiddleware = createSagaMiddleware();

// store 생성 및 store에 Middleware Mount
const middleware = applyMiddleware(sagaMiddleware);

const store =
    process.env.NODE_ENV === "production"
        ? createStore(reducer, middleware)
        : createStore(reducer, composeWithDevTools(middleware));

export default store;

sagaMiddleware.run(rootSaga);
