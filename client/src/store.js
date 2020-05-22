import {createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';


const initialState = {
    tab: 'STANDARD',
    user: '',
    pass: ''
}

const middleware = [thunk];

// note to self, disable redux tools
// when in development
const store = createStore(
	rootReducer, 
	initialState,
	compose(
		applyMiddleware(...middleware),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

export default store