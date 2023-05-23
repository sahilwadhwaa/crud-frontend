import { configureStore } from '@reduxjs/toolkit';
import studentReducer from '../features/counter/studentSlice';

export const store = configureStore({
  reducer: {
    students: studentReducer,
  },
});
