import {createAsyncThunk} from "@reduxjs/toolkit";
import {instance} from "../../api";
import {loginUserType, registerUserType} from "../../core/types/requests/auth.types";

export const registerUser = createAsyncThunk<any, registerUserType, {rejectValue: string}>('auth/registerUser',
  async (body, {rejectWithValue}) => {
    return await instance.post('/api/Auth/RegisterUser', body)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error.response.data.title));
  });

export const loginUser = createAsyncThunk<any, loginUserType, {rejectValue: string}>('auth/loginUser',
  async (body, {rejectWithValue}) => {
    return await instance.post('/api/Auth/loginUser', body)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error.response.data.title));
  });
