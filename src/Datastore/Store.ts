import counterReducer from './Reducers/counter';
import loggedInReducer from './Reducers/loggedIn';
import {combineReducers} from 'redux';

let allReducers = combineReducers({
    counter: counterReducer,
    isLoggedIn: loggedInReducer
});

export default allReducers;