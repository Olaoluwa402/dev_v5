import { configureStore } from '@reduxjs/toolkit';
import { reducers } from './combinedSlices';

export const store = configureStore({ reducer: reducers });
