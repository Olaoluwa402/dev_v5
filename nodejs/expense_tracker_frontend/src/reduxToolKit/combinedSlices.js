import { combineSlices } from '@reduxjs/toolkit';
import authLoginReducer from './features/auth/authLogin.slice';
import authRegisterReducer from './features/auth/authRegister.slice';

export const reducers = combineSlices({
    loggedInUser: authLoginReducer,
    createdUser: authRegisterReducer
});
