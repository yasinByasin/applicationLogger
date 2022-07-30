import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchAppLogger } from './appLoggerAPI';

const appLoggerAdapter = createEntityAdapter({
  selectId: model => model._id,
});

export const getAppLogger = createAsyncThunk('appLogger/fetchAppLogger', async () => {
  try {
    const response = await fetchAppLogger();
    const { data } = response;
    return data === undefined ? null : data.result.auditLog;
  } catch (error) {
    return null;
  }
});

const initialState = {
  applicationsLogger: [],
}

export const appLoggerSlice = createSlice({
  name: 'appLogger',
  initialState,
  reducers: {
    extraReducers: (builder) => {
      builder
        .addCase(getAppLogger.fulfilled, (state, action) => {
          state.applicationsLogger = action.payload;
        })
    },
  },
});


export default appLoggerSlice.reducer;
