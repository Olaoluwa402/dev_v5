import { combineSlices } from '@reduxjs/toolkit';
import authReducer from './features/auth/auth.slice';

export const reducers = combineSlices({
    createdUser: authReducer
});
