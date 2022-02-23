import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from "./reducers";
import rootSaga from "./sagas";
const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
    sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

export default store;
