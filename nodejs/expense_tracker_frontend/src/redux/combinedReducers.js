import { combineReducers } from 'redux';
import { registerUserReducer, loginUserReducer } from './reducers/user/user';

export const combined = combineReducers({
    createdUser: registerUserReducer,
    loggedInUser: loginUserReducer
});
