import runReducer from './Reducers/runReducer';
import loggedInReducer from './Reducers/loggedIn';
import { combineReducers } from 'redux';

let allReducers = combineReducers({
    runs: runReducer,
    isLoggedIn: loggedInReducer
});

export default allReducers;