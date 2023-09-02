import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
import thunkMiddleware from 'redux-thunk';

const composeEnhacer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const store = createStore(
	reducer,
	composeEnhacer(applyMiddleware(thunkMiddleware))
);

export default store;