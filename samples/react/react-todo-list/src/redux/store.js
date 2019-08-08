import {createLogger} from "redux-logger";
import {createStore, applyMiddleware} from "redux";
import todoApp from './reducers/index';

const loggerMiddleware = createLogger();
const store = createStore(todoApp, applyMiddleware(loggerMiddleware));

export default store;