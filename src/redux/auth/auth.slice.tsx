import {createSlice} from "@reduxjs/toolkit";
import {loginUser, registerUser} from "./auth.thunks";

interface authInterface {
  registerFetchStatus: null | string,
  loginFetchStatus: null | string,
}

const initialState: authInterface = {
  registerFetchStatus: null,
  loginFetchStatus: null,
};

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // LOGIN
    builder.addCase(loginUser.pending, (state, action) => {
      state.loginFetchStatus = action.meta.requestStatus;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loginFetchStatus = action.meta.requestStatus;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loginFetchStatus = action.meta.requestStatus;
    });
    // REGISTER
    builder.addCase(registerUser.pending, (state, action) => {
      state.loginFetchStatus = action.meta.requestStatus;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loginFetchStatus = action.meta.requestStatus;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loginFetchStatus = action.meta.requestStatus;
    });
  }
});

export default authSlice.reducer;