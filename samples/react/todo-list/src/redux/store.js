import {createLogger} from "redux-logger";
import {createStore, applyMiddleware} from "redux";
import {persistStore, persistReducer} from 'redux-persist';
import localForage from 'localforage';
import todoApp from './reducers/index';

const persistedReducer = persistReducer({
	key: 'root',
	storage: localForage
}, todoApp);
const loggerMiddleware = createLogger();

function configureStore (initialState = {}) {
	let store = createStore(persistedReducer, initialState, applyMiddleware(loggerMiddleware));
	console.log(`InitialState: ${store.getState()}`);
	let persistor = persistStore(store, null, () => {
		console.log(`RestoreState: ${store.getState()}`);
	});
	return {store, persistor};
}

export default configureStore