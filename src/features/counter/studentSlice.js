import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  students: [],
  user: null,
  token: null,
  classroom: []
};

export const studentSlice = createSlice({
  name: 'students',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addDetails: (state, action) => {
      state.students= action.payload.students
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    addClass: (state, action) => {
      state.classroom= action.payload.classroom
    },
  }
});

export const { addDetails, setLogin, addClass } = studentSlice.actions;

export default studentSlice.reducer;
