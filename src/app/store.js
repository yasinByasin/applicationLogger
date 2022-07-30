import { configureStore } from '@reduxjs/toolkit';
import appLoggerReducer from '../applications/applicationsLogger/AppLoggerSlice';

export const store = configureStore({
  reducer: {
    appLogger: appLoggerReducer,
  },
});
